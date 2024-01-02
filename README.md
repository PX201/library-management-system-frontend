# Library Management System - Frontend

## Overview

This repository contains the frontend codebase for a comprehensive Library Management System developed using React.js. The system provides functionalities for managing books, borrowers, transactions, and user roles, offering a seamless experience for librarians and users.

## Features

### Book Management
- **Add, Retrieve, Update, Delete:**
  - Manage the library inventory with operations for adding, viewing, modifying, and removing books.
- **Search Functionality:**
  - Search books by keyword, including book title, author, or ISBN.

### Borrower Management
- **Manage Borrowers:**
  - Add, update, or delete borrower information.
- **Search Functionality:**
  - Find borrowers by keywords, including phone number, last 4 digits of the phone number, email, or borrower number.

### Transaction Management
- **Check-in/Check-out:**
  - Process book transactions for borrowers.
- **Transaction History:**
  - Retrieve transaction history by ISBN or borrower number.

### User/Librarian Management
- **Authentication & Authorization:**
  - Role-based access control for librarians.
  - Admin privileges for user management.

## Setup

### Clone and Install Dependencies
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/library-management-frontend.git
   ```
2. Install dependencies:
   ```bash
   cd library-management-frontend
   npm install
   ```

### Backend Base URL Configuration
Update the `authenticationApiServices.js` file:
```javascript
// authenticationApiServices.js
const BaseURL = 'http://localhost:8080'; // Replace with your backend URL
```

## Running the Application
Start the development server:
```bash
npm start
```

## Authentication
- Token-based authentication system.
- Tokens stored in local storage upon successful login.

## Code Structure

### Components
Contains React components responsible for rendering UI elements.

### Services
Axios-based services for interacting with the backend API.

### Security
AuthContext for handling authentication and token management.

## Technologies Used
- React.js for the frontend framework.
- Axios for making HTTP requests to the backend.
- Local storage for token-based authentication.

## License

This project is licensed under the [MIT License](LICENSE.md).
