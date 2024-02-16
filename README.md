# Tast It a Task Manager Software

Welcome to our Tast It! This README file provides an overview of the application and instructions on how to set it up and use it effectively.

## Overview

Our Task Manager software is designed to help users organize and manage their tasks efficiently. It consists of a FastAPI backend serving as an API with authentication and token management, and a React frontend for the user interface. Here are the key components:

- **FastAPI Backend**: The backend is built using FastAPI, a modern, fast (high-performance) web framework for building APIs with Python 3.7+. It provides endpoints for task management, user authentication, and token management.
- **React Frontend**: The frontend is developed using React, a popular JavaScript library for building user interfaces. We've utilized Material-UI for styling, Redux for state management, Axios for making HTTP requests, and React Query for managing data fetching and caching.

## Features

- User authentication with JWT (JSON Web Tokens) and refresh tokens.
- CRUD (Create, Read, Update, Delete) operations for managing tasks.
- Intuitive user interface with Material Design principles.
- Redux for state management to maintain consistency across components.
- Efficient data fetching and caching with React Query.
- Easy setup and deployment.

## Installation

Follow these steps to set up the Task Manager software:

### Backend Setup

1. Clone this repository to your local machine.
2. Navigate to the `backend` directory.
3. Create a virtual environment: `python -m venv venv`.
4. Activate the virtual environment:
   On Windows: `venv\Scripts\activate`
   On macOS and Linux: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`.
6. Set up environment variables:
   Create a .env file based on the provided .env.example.
   Update the variables with your configuration (e.g., database connection details, secret keys).
7. Run the FastAPI server: `uvicorn main:app --reload`.

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

## Usage

Once the backend and frontend are set up, you can access the Task Manager software through your web browser. Sign up for a new account or log in with existing credentials to start managing your tasks.

## Contributing

We welcome contributions from the community. If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or need further assistance, feel free to contact us at syedfaizanalirehan@gmail.com

Thank you for using Task It! We hope it helps you stay organized and productive.
