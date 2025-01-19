
# iNoteBook

## Description

iNoteBook is a note-taking web application that allows users to securely create, update, delete, and manage their notes. The application uses JWT (JSON Web Tokens) for authentication, MongoDB for data storage, and includes features such as note CRUD operations and user authentication.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **User-Specific Notes**: Each user has access to their own set of notes.
- **Responsive UI**: Designed to be mobile-friendly with Bootstrap.

## Technologies Used

- **Frontend**:
  - React.js
  - Bootstrap 4
  - React Router for navigation

- **Backend**:
  - Node.js with Express
  - MongoDB with Mongoose for database management
  - JWT (JSON Web Tokens) for authentication

- **Development Tools**:
  - npm
  - Postman for API testing

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/iNoteBook.git
```

### Frontend Installation

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install required npm packages:

```bash
npm install
```

3. Run the React application:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

### Backend Installation

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install required npm packages:

```bash
npm install
```

3. Start the server:

```bash
npm run dev
```

The backend will run on `http://localhost:4000`.

## Environment Variables

In the backend folder, create a `.env` file and set the following variables:

```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

## API Endpoints

### User Authentication

- **POST** `/api/auth/createuser`: Create a new user (sign-up)
- **POST** `/api/auth/login`: Login with existing user credentials

### Notes Operations (Requires Authentication)

- **GET** `/api/notes/fetchallnotes`: Get all the notes for the authenticated user
- **POST** `/api/notes/addnote`: Add a new note
- **PUT** `/api/notes/updatenote/:id`: Update an existing note
- **DELETE** `/api/notes/deletenote/:id`: Delete a note

## npm Commands

### Frontend Commands

- `npm start`: Runs the React app in development mode (on `http://localhost:3000`).
- `npm run build`: Builds the React app for production.
- `npm install`: Installs the required dependencies for the React application.
- `npm test`: Runs the test suite for the React app.

### Backend Commands

- `npm run dev`: Starts the backend server with live reloading (using `nodemon`).
- `npm install`: Installs the required dependencies for the backend server.
- `npm run start`: Starts the backend server (without live reloading).
- `npm test`: Run the test suite for the backend.

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
