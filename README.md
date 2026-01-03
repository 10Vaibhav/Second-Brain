# Second Brain

A full-stack web application that helps users organize and manage content from various platforms in one centralized dashboard. Save links, organize content, and share your curated collections with others.

## Features

- **Secure Authentication**: User registration and login with JWT tokens and bcrypt password hashing
- **Content Management**: Add, view, and delete content with support for multiple content types
- **Smart Organization**: Filter and organize content by platform (Twitter, YouTube, Instagram, etc.)
- **Share Collections**: Generate shareable links to your curated content collections
- **Responsive Design**: Modern UI built with Tailwind CSS and React Icons
- **Protected Routes**: Secure dashboard access with authentication middleware

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS 4** for styling
- **React Router DOM** for navigation
- **Axios** for API communication
- **React Icons** for UI icons

### Backend
- **Node.js** with Express.js and TypeScript
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Zod** for input validation
- **CORS** enabled for cross-origin requests

### Development & Deployment
- **PM2** for process management
- **Nodemon** for development hot-reload
- **ESLint** for code linting
- **TypeScript** for type safety

## API Endpoints

- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login
- `POST /api/v1/content` - Add new content
- `GET /api/v1/content` - Get user's content
- `DELETE /api/v1/content` - Delete content
- `POST /api/v1/brain/share` - Create/remove shareable link
- `GET /api/v1/brain/:shareLink` - Access shared content

## Usage

1. **Sign Up**: Create a new account with username and password
2. **Add Content**: Save links from various platforms with titles and categories
3. **Organize**: Filter content by type and manage your collection
4. **Share**: Generate shareable links to your curated content
5. **Access Shared**: View other users' shared content collections

## License

This project is licensed under the MIT License - see the LICENSE file for details.