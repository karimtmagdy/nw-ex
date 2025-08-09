"dev": "nodemon --exec ts-node api/index.ts",
"dev": "ts-node-dev --respawn --transpile-only api/index.ts",

# black and white Store E-commerce API

A complete e-commerce backend API built with Node.js, Express, MongoDB, and JWT authentication. This project provides endpoints for managing categories, services/products, and user authentication.

## Features

- User authentication with JWT
- Role-based access control (user/admin)
- Category management
- Service/Product management
- MongoDB integration
- Ready for Vercel deployment

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git (for version control)

The server will start on http://localhost:3000

## API Endpoints

### Authentication

- `POST /api/v1/auth/sign-up` - Register a new user
- `POST /api/v1/auth/sign-in` - Login Authenticate user & get token
- `POST /api/v1/auth/sign-out` - Logout user & remove token

### Users

- `GET /api/v1/users` - Get all users (admin only)
- `GET /api/v1/users/:id` - Get user by ID (admin only)
- `POST /api/v1/users` - Create a new user (admin only)
- `PATCH /api/v1/users/:id` - Update a user (admin only)
- `DELETE /api/v1/users/:id` - Delete a user (admin only)
- `GET /api/users/me` - Get current user profile (requires authentication)

### Categories

- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:id` - Get category by ID
- `POST /api/v1/categories` - Create a new category (admin only)
- `PATCH /api/v1/categories/:id` - Update a category (admin only)
- `DELETE /api/v1/categories/:id` - Delete a category (admin only)

### Services/Products

- `GET /api/services` - Get all services
- `GET /api/services/category/:categoryId` - Get services by category
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create a new service (admin only)
- `PATCH /api/services/:id` - Update a service (admin only)
- `DELETE /api/services/:id` - Delete a service (admin only)

## Deployment to Vercel

1. Create a Vercel account and install the Vercel CLI:

   ```
   npm install -g vercel
   ```

2. Login to Vercel:

   ```
   vercel login
   ```

3. Deploy to Vercel:

   ```
   vercel
   ```

4. Set up environment variables in the Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key

## GitHub Integration

1. Create a new GitHub repository
2. Push your code to GitHub:

   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/newave-store.git
   git push -u origin main
   ```

3. Connect your Vercel project to the GitHub repository for automatic deployments

## Accessing the Application

Once deployed, your API will be accessible at:

- https://newave-store.vercel.app/

You can also access it locally at:

- http://localhost:3000

## License

MIT

## DEV

- "con":"concurrently \"npm run dev\" \"npm run start\" "
  {
  "version": 2,
  "builds": [
  {
  "src": "dist/server.js",
  "use": "@vercel/node"
  }
  ],
  "routes": [
  {
  "src": "^/(.*)$",
  "dest": "dist/server.js"
  }
  ]
  }

eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-node eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks
