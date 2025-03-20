# Hands-On Platform

## Project Overview

Hands-On Platform is a community service application that connects volunteers with events, help requests, and teams. It enables users to contribute to causes they care about, track their volunteer hours, and collaborate with like-minded individuals to make a positive impact in their communities.

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- bcryptjs for password hashing
- Express Validator for request validation
- dotenv for environment variables

### Frontend

- React 18
- React Router v6
- Vite as build tool
- Tailwind CSS for styling
- Axios for API requests
- Context API for state management

## Features

- **User Authentication**: Register, login, and profile management
- **Events Management**: Create, view, join, and delete community service events
- **Help Requests**: Post requests for assistance, volunteer for others' requests
- **Teams**: Create and join teams for collaborative volunteering
- **Impact Tracking**: Log volunteer hours and track community impact
- **Leaderboard**: View top contributors in the community
- **Responsive Design**: Mobile-friendly interface for on-the-go access

## Database Schema

### User

```
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  skills: [String],
  causes: [String],
  timestamps: true
}
```

### Event

```
{
  title: String (required),
  description: String (required),
  date: Date (required),
  time: String (required),
  location: String (required),
  category: String (required),
  createdBy: ObjectId (ref: User, required),
  attendees: [ObjectId] (ref: User),
  timestamps: true
}
```

### HelpRequest

```
{
  title: String (required),
  description: String (required),
  urgency: String (enum: ["low", "medium", "urgent"], required),
  location: String (required),
  createdBy: ObjectId (ref: User, required),
  volunteers: [ObjectId] (ref: User),
  timestamps: true
}
```

### Team

```
{
  name: String (required),
  description: String (required),
  isPrivate: Boolean (default: false),
  createdBy: ObjectId (ref: User, required),
  members: [ObjectId] (ref: User),
  timestamps: true
}
```

### Impact

```
{
  user: ObjectId (ref: User, required),
  event: ObjectId (ref: Event, required),
  hours: Number (required),
  status: String (enum: ["pending", "verified"], default: "pending"),
  verifiedBy: ObjectId (ref: User),
  createdAt: Date (default: Date.now)
}
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Documentation

### Authentication Endpoints

#### Register User

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body**: `{ name, email, password }`
- **Response**: User object with JWT token

#### Login User

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body**: `{ email, password }`
- **Response**: User object with JWT token

### Profile Endpoints

#### Get User Profile

- **URL**: `/api/profile`
- **Method**: `GET`
- **Auth**: Required
- **Response**: User profile data

#### Update Profile

- **URL**: `/api/profile`
- **Method**: `PATCH`
- **Auth**: Required
- **Body**: `{ name, skills, causes }`
- **Response**: Updated user profile

### Event Endpoints

#### Create Event

- **URL**: `/api/events`
- **Method**: `POST`
- **Auth**: Required
- **Body**: `{ title, description, date, time, location, category }`
- **Response**: Created event object

#### Get All Events

- **URL**: `/api/events`
- **Method**: `GET`
- **Response**: Array of events

#### Get Event by ID

- **URL**: `/api/events/:id`
- **Method**: `GET`
- **Response**: Event object

#### Join Event

- **URL**: `/api/events/:id/join`
- **Method**: `POST`
- **Auth**: Required
- **Response**: Updated event with attendee added

#### Delete Event

- **URL**: `/api/events/:id`
- **Method**: `DELETE`
- **Auth**: Required (must be creator)
- **Response**: Success message

### Help Request Endpoints

#### Create Help Request

- **URL**: `/api/help-requests`
- **Method**: `POST`
- **Auth**: Required
- **Body**: `{ title, description, urgency, location }`
- **Response**: Created help request object

#### Get All Help Requests

- **URL**: `/api/help-requests`
- **Method**: `GET`
- **Response**: Array of help requests

#### Get Help Request by ID

- **URL**: `/api/help-requests/:id`
- **Method**: `GET`
- **Response**: Help request object

#### Volunteer for Help Request

- **URL**: `/api/help-requests/:id/volunteer`
- **Method**: `POST`
- **Auth**: Required
- **Response**: Updated help request with volunteer added

#### Delete Help Request

- **URL**: `/api/help-requests/:id`
- **Method**: `DELETE`
- **Auth**: Required (must be creator)
- **Response**: Success message

### Team Endpoints

#### Create Team

- **URL**: `/api/teams`
- **Method**: `POST`
- **Auth**: Required
- **Body**: `{ name, description, isPrivate }`
- **Response**: Created team object

#### Get Public Teams

- **URL**: `/api/teams`
- **Method**: `GET`
- **Response**: Array of public teams

#### Get Team by ID

- **URL**: `/api/teams/:id`
- **Method**: `GET`
- **Response**: Team object

#### Join Team

- **URL**: `/api/teams/:id/join`
- **Method**: `POST`
- **Auth**: Required
- **Response**: Updated team with member added

#### Leave Team

- **URL**: `/api/teams/:id/leave`
- **Method**: `POST`
- **Auth**: Required
- **Response**: Updated team with member removed

### Impact Endpoints

#### Log Volunteer Hours

- **URL**: `/api/impact/log-hours`
- **Method**: `POST`
- **Auth**: Required
- **Body**: `{ event, hours }`
- **Response**: Created impact record

#### Verify Volunteer Hours

- **URL**: `/api/impact/verify-hours`
- **Method**: `POST`
- **Auth**: Required (event creator only)
- **Body**: `{ impactId }`
- **Response**: Updated impact record

#### Get User Points

- **URL**: `/api/impact/points`
- **Method**: `GET`
- **Auth**: Required
- **Response**: User's total impact points

#### Get Leaderboard

- **URL**: `/api/impact/leaderboard`
- **Method**: `GET`
- **Response**: Array of top contributors

## Running the Project

### Local Development

1. Start the backend server:

   ```
   cd backend
   npm run dev
   ```

2. In a separate terminal, start the frontend development server:

   ```
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

### Production Deployment

1. Build the frontend:

   ```
   cd frontend
   npm run build
   ```

2. Configure your production environment variables for the backend

3. Deploy the backend to your preferred hosting service (Heroku, AWS, etc.)

4. Deploy the frontend build folder to a static hosting service (Netlify, Vercel, etc.)

5. Update the API base URL in the frontend to point to your production backend
