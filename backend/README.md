# FILE: /my-angular-python-app/my-angular-python-app/backend/README.md

# Backend Documentation

This directory contains the backend implementation of the Angular-Python application. The backend is built using Flask, a lightweight WSGI web application framework in Python.

## Project Structure

- **app/**: Contains the main application code.
  - **\_\_init\_\_.py**: Initializes the Python package.
  - **main.py**: Entry point for the Flask application. Sets up the app and runs the server.
  - **routes.py**: Defines the API routes and request handlers.

- **requirements.txt**: Lists the Python dependencies required for the backend application.

## Getting Started

To set up the backend, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd personalweb/backend
   ```

2. **Create a virtual environment** (optional but recommended):
   ```
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```
   sudo apt-get update
   sudo apt-get install python3-dev default-libmysqlclient-dev build-essential
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```
   python3 app/main.py
   ```

The backend server will start, and you can access it at `http://localhost:5000`.

## API Endpoints

Refer to the `routes.py` file for the list of available API endpoints and their functionalities.
