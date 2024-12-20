# Password Manager Project

This document provides an overview of the Password Manager project. The application allows users to securely manage their passwords, with features like encryption, decryption, and user authentication (login/logout).

## Project Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Environment Variables**
   Ensure you have a `.env` file in your project root with the necessary configurations, such as database credentials and secret keys.

## Routes

### User Routes

File: `routes/user.routes.js`

#### Endpoints

1. **Register User**
   - **URL**: `/users/register`
   - **Method**: `POST`
   - **Description**: Registers a new user with validation checks.
   - **Validation**:
     - `email`: Must be a valid email address.
     - `fullname.firstname`: Must be at least 3 characters long.
     - `password`: Must be at least 6 characters long.
   - **Controller**: `registerUser`

2. **Login User**
   - **URL**: `/users/login`
   - **Method**: `POST`
   - **Description**: Logs in a user with email and password validation.
   - **Validation**:
     - `email`: Must be a valid email address.
     - `password`: Must be at least 6 characters long.
   - **Controller**: `loginUser`

3. **Get User Profile**
   - **URL**: `/users/profile`
   - **Method**: `GET`
   - **Description**: Fetches the authenticated user's profile.
   - **Middleware**: `authMiddleware.authUser`
   - **Controller**: `getProfile`

4. **Logout User**
   - **URL**: `/users/logout`
   - **Method**: `GET`
   - **Description**: Logs out the authenticated user.
   - **Middleware**: `authMiddleware.authUser`
   - **Controller**: `logoutUser`

### Password Management Routes

#### Endpoints

1. **Add Password**
   - **URL**: `/addPassword`
   - **Method**: `POST`
   - **Description**: Adds a new password to the database with encryption.
   - **Request Body**:
     - `password`: The plaintext password.
     - `title`: A title or label for the password.
   - **Encryption**: Utilizes AES-256-CTR encryption.

2. **Decrypt Password**
   - **URL**: `/decryptPassword`
   - **Method**: `POST`
   - **Description**: Decrypts an encrypted password.
   - **Request Body**:
     - `password`: Encrypted password object (including IV).

3. **Show All Passwords**
   - **URL**: `/showPasswords`
   - **Method**: `GET`
   - **Description**: Fetches all stored passwords from the SQL database.

### Miscellaneous Route

1. **Base Endpoint**
   - **URL**: `/`
   - **Method**: `GET`
   - **Description**: Base endpoint to test server connectivity.

## Features

1. **User Authentication**:
   - Register, login, and logout functionality using MongoDB for session management.

2. **Password Management**:
   - Secure storage of passwords in a MySQL database with AES-256 encryption.
   - Decrypt passwords when needed.

3. **Middleware**:
   - Authentication middleware ensures secure access to protected routes.

## Encryption and Decryption

Encryption and decryption functionality is implemented using the `crypto` module.

- **Encryption**:
  - Creates an AES-256-CTR cipher.
  - Returns encrypted password and initialization vector (IV).

- **Decryption**:
  - Uses AES-256-CTR decipher with the stored IV to retrieve the original password.

## Database

1. **SQL Database (MySQL)**:
   - Stores passwords with encrypted values and IV.

2. **MongoDB**:
   - Manages user authentication and session data.

## Usage

- Start the backend server before testing the endpoints.
- Use tools like Postman to test API routes.
- Ensure both SQL and MongoDB servers are running and properly configured.



This README serves as a comprehensive guide to understanding and using the Password Manager project. For additional details, refer to the project codebase.

