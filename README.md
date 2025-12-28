# 🌍 Travel Planning Web App

[cite_start]A full-stack traveling destination platform built using a **Client-Server architecture**[cite: 6]. [cite_start]This application allows users to discover destinations, manage personal "want-to-go" lists, and search through a travel database[cite: 8, 9].

## 🚀 Features

* [cite_start]**User Authentication**: Secure registration and login system with error handling for duplicate usernames or empty fields[cite: 13, 18].
* [cite_start]**NoSQL Database Management**: Integration with **MongoDB** to store user information and travel data in a collection named `myCollection`[cite: 17, 59].
* [cite_start]**Personalized Want-to-Go List**: A dynamic list management system that prevents duplicate destination entries for the same user[cite: 32, 35].
* [cite_start]**Search Functionality**: A substring-based search engine that returns destinations matching user keywords (e.g., searching "div" returns "Maldives")[cite: 39].
* [cite_start]**Session Management**: Implemented **express-session** to handle concurrent users and protect private routes from unauthorized access[cite: 71, 72].
* [cite_start]**Dynamic UI**: Powered by **EJS (Embedded JavaScript)** to render server-side data into interactive HTML views[cite: 64, 65].
* [cite_start]**Media Streaming**: Destination pages feature embedded video descriptions for an immersive user experience[cite: 28].



## 🛠️ Tech Stack

* [cite_start]**Backend**: Node.js [cite: 43]
* [cite_start]**Server Framework**: Express [cite: 49]
* [cite_start]**Database**: MongoDB (NoSQL DBMS) [cite: 58, 60]
* [cite_start]**Template Engine**: EJS [cite: 64]
* [cite_start]**Session Handling**: Express-Session [cite: 69]

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
    * [cite_start]Ensure **MongoDB** is installed and running locally[cite: 61].
    * [cite_start]The system uses a database named `myDB` and a collection named `myCollection`[cite: 59].

4.  **Run the application**:
    ```bash
    npm start
    ```
    * [cite_start]The website will be hosted on your PC's **local host**[cite: 10].

## 🧬 System Architecture

[cite_start]The project follows a modular structure where the **Express** server handles the business logic and database queries[cite: 52, 75]. [cite_start]**EJS** serves as the template engine to generate HTML with plain JavaScript[cite: 65]. [cite_start]The **MongoDB DBMS** ensures data persistence for user accounts and their specific travel preferences[cite: 60].
