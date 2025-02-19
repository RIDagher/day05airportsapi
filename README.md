Airports API Project

📌 Project Overview

The Airports API Project is a full-stack web application for managing airport data. It includes:
✅ A RESTful API (Node.js, Express, Sequelize)
✅ A web-based client (HTML, CSS, jQuery, Bootstrap)
✅ Google Maps integration for airport visualization

📂 Project Structure
/day05airports  
│── /server # Backend server  
│ ├── /models # Sequelize models (database schema)  
│ ├── /routes # API routes  
│ ├── /controllers # Logic for handling API requests  
│ ├── server.js # Main server file  
│── /client # Front-end  
│ ├── /scripts # JavaScript logic  
│ ├── /styles # CSS files  
│ ├── index.html # Main UI for interacting with API  
│ ├── map.html # Google Maps visualization  
│── .env # Environment variables (API keys, database config)  
│── package.json # Project dependencies  
│── README.md # Documentation

🚀 Technologies Used

Backend (Server)
• Node.js & Express - Handles API requests
• Sequelize (MySQL) - ORM for database interaction
• CORS & dotenv - Security & environment variables

Frontend (Client-Side)
• HTML, CSS, Bootstrap - UI design & styling
• JavaScript & jQuery - Fetching & displaying data
• Google Maps API - Displaying airport locations

Database (MySQL + Sequelize)
• Airports Table - Stores airport details

📌 Features

🔹 RESTful API
The backend provides a RESTful API with the following endpoints:

🔹 Database (Sequelize - MySQL)
The airports table stores airport data:
✔ Validations included:
• Airport Code: 3-6 uppercase letters
• City Name: 1-40 characters, must be unique
• Latitude: Between -90 and 90
• Longitude: Between -180 and 180

🔹 Frontend (Bootstrap + jQuery)
Features:
✅ Styled with Bootstrap for a modern UI
✅ Fetch & display airports dynamically
✅ Add, update, delete airports
✅ Google Maps integration
Client-side validation before submitting data:

🔹 Google Maps Integration
Feature: Displays all airport locations on a Google Map
• Uses Google Maps API to plot markers
• Markers display airport details when clicked
• Uses AdvancedMarkerElement (new standard)

💡 Future Enhancements
• Add search & filter functionality
• Improve error handling on the frontend
• Add user authentication (JWT)

👨‍💻 Author
Rima Dagher
Developed as part of the Full Stack Web Development course at John Abbott College.
