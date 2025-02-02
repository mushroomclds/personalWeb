# Stage 1: Build Angular App with Node.js image(Debian-based)
FROM node:18-bullseye-slim AS build-frontend
WORKDIR /usr/local/app/frontend

# Copy frontend package.json and package-lock.json
COPY frontend/package*.json ./

# Install only production dependencies to keep the image lean
RUN npm install --production

# Copy the rest of the frontend application files
COPY frontend/ .

# Build the Angular app with production configuration
RUN npx ng build --configuration production



# Stage 2: Set Up Flask Backend
FROM python:3.10-slim AS build-backend
WORKDIR /usr/local/app/backend

# Copy backend requirements.txt
COPY backend/requirements.txt ./

# Create and activate virtual environment, then install dependencies
RUN python3 -m venv venv 

RUN echo 'export VIRTUAL_ENV="/usr/local/app/backend/venv"' >> ~/.bashrc && \
    echo 'export PATH="$VIRTUAL_ENV/bin:$PATH"' >> ~/.bashrc

# Activate the virtual environment
RUN . venv/bin/activate && \
    pip install --upgrade pip 
    
RUN python3 -m pip install --no-cache-dir -r requirements.txt


# Copy the rest of the backend application files
COPY backend/ .


# Stage 3: Serve with Nginx (Debian-based)
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Copy built Angular app from the first stage to Nginx's web directory
COPY --from=build-frontend /usr/local/app/frontend/dist/personal-web/browser /usr/share/nginx/html

# Copy Flask backend from the second stage
COPY --from=build-backend /usr/local/app/backend /usr/local/app/backend

# Copy the custom Nginx configuration file
COPY frontend/default.conf /etc/nginx/conf.d/default.conf

#update and install vim
RUN apt update && apt install -y vim && apt-get install -y gunicorn

# Expose port 80 for web traffic
EXPOSE 80

RUN ln -s /usr/bin/python3 /usr/bin/python

# RUN echo 'export VIRTUAL_ENV="/usr/local/app/backend/venv"' >> ~/.bashrc && \
#     echo 'export PATH="$VIRTUAL_ENV/bin:$PATH"' >> ~/.bashrc

# Start Gunicorn and Nginx and venv
CMD ["sh", "-c", "source /usr/local/app/backend/venv/bin/activate && gunicorn --chdir /usr/local/app/backend app.main:app --bind 0.0.0.0:5000 & nginx -g 'daemon off;'"]