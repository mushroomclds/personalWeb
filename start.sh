#!/bin/bash

#set variables
source ./setenv

#start venv
source ./backend/venv/bin/activate

#start app
echo "Starting the application..."

# Function to print in red
print_in_red() {
    while IFS= read -r line; do
        echo -e "\e[31m$line\e[0m"
    done
}

# Function to print in green
print_in_green() {
    while IFS= read -r line; do
        echo -e "\e[32m$line\e[0m"
    done
}

# Start the backend and redirect output to the print_in_green function
python3 ./backend/app/main.py > >(print_in_green) 2> >(print_in_green) &
BACKEND_PID=$!

# Start the frontend and redirect output to the print_in_red function
cd ./frontend && ng serve --poll=2000 > >(print_in_red) 2> >(print_in_red) &
FRONTEND_PID=$!

# Function to stop the processes
stop_processes() {
    echo "Stopping the application..."
    kill $BACKEND_PID $FRONTEND_PID
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "Application stopped."
}

# Trap the stop command
trap 'stop_processes' SIGINT

# Wait for the processes to finish
wait $BACKEND_PID $FRONTEND_PID