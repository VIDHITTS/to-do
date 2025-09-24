# 📝 Professional Todo Manager

A modern, responsive todo application built with React frontend and Node.js/Express backend with MySQL database.

## ✨ Features

- **Add Todos**: Create new todos with title and optional description
- **Mark Complete**: Toggle todo completion status
- **Delete Todos**: Remove todos you no longer need
- **Filter Views**: View all, pending, or completed todos
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Professional UI**: Modern gradient design with smooth animations
- **Real-time Updates**: Changes sync immediately with the database

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your MySQL database:
   - Create a database named `ap_db`
   - Create a `.env` file with your database URL:
   ```bash
   echo 'DATABASE_URL="mysql://root:your_password@localhost:3306/ap_db"' > .env
   ```
   - Generate Prisma client:
   ```bash
   npm run db:generate
   ```
   - Push the schema to your database:
   ```bash
   npm run db:push
   ```
   - (Optional) Seed with sample data:
   ```bash
   npm run db:seed
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd front-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 🎨 Design Features

- **Modern Gradient Background**: Beautiful purple-blue gradient
- **Glass Morphism**: Frosted glass effect on header and filter buttons
- **Smooth Animations**: Hover effects and transitions throughout
- **Professional Typography**: Clean, readable fonts
- **Responsive Layout**: Adapts to all screen sizes
- **Accessibility**: Proper focus states and keyboard navigation

## 🛠️ Technical Stack

### Frontend
- **React 19**: Latest React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with gradients, animations, and responsive design

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Prisma**: Modern database ORM
- **MySQL**: Database
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger

## 📱 Responsive Design

The application is fully responsive and works great on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🔧 API Endpoints

- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## 🎯 Usage

1. **Adding Todos**: Enter a title and optional description, then click "Add Todo"
2. **Completing Todos**: Click the circle button to mark as complete
3. **Filtering**: Use the filter buttons to view all, pending, or completed todos
4. **Deleting**: Click the trash icon to remove a todo

## 🚀 Deployment

For production deployment:

1. Build the frontend:
   ```bash
   cd front-end
   npm run build
   ```

2. Serve the built files with your backend or a static file server

3. Update the database connection settings for your production environment

## 📄 License

This project is open source and available under the MIT License.
