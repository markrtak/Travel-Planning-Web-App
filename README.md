# 🌍 Travel Planning Web App

A full-stack traveling destination platform built using a **Client-Server architecture**. This application allows users to discover destinations, manage personal "want-to-go" lists, and search through a travel database.

## 📺 Project Demo
You can view a full video demonstration of the application's features, including user registration, destination browsing, and the search functionality, via the link below:

* **[Watch the Project Demo on Google Drive](YOUR_GOOGLE_DRIVE_LINK_HERE)**

## 🚀 Features

* **User Authentication**: Secure registration and login system with custom validation for unique usernames and required fields.
* **NoSQL Database Management**: Integration with **MongoDB** to store user information and travel data in a database named `myDB` and collection named `myCollection`.
* **Personalized Want-to-Go List**: Dynamic list management system that performs database checks to prevent duplicate destination entries for the same user.
* **Search Functionality**: A substring-based search engine that queries the database to return destinations matching partial user keywords (e.g., searching "div" returns "Maldives").
* **Session Management**: Implemented **express-session** to handle concurrent users, maintain state across different browsers, and protect private routes from unauthorized access.
* **Dynamic UI**: Powered by **EJS (Embedded JavaScript)** to render server-side data into interactive HTML views.
* **Media Streaming**: Destination pages feature embedded video descriptions for an immersive user experience.



## 🛠️ Tech Stack

* **Backend**: Node.js
* **Server Framework**: Express
* **Database**: MongoDB (NoSQL DBMS)
* **Template Engine**: EJS
* **Session Handling**: Express-Session

## 🔧 Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/markrtak/Travel-Planning-Web-App.git](https://github.com/markrtak/Travel-Planning-Web-App.git)
    cd Travel-Planning-Web-App
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Database Configuration**:
    * Ensure **MongoDB** is installed and running locally.
    * The system uses a database named `myDB` and a collection named `myCollection`.

4.  **Run the application**:
    * Run the command `npm start` or the specific entry file (e.g., `node app.js`).
    * The website will be hosted on your PC's **local host**
