

# Installation and execution instructions.
## API Setup and Configuration

This guide provides instructions to set up and run the API using Docker, Visual Studio Code, and SQL Server.

## Prerequisites

- Docker: Download and install Docker from [here](https://www.docker.com/products/docker-desktop/).
- Visual Studio Code: Ensure you have Visual Studio Code installed.
- Node.js and npm: Ensure you have Node.js and npm installed.

## Steps to Setup the API

### 1. Install Docker

Download Docker from the [Docker website](https://www.docker.com/products/docker-desktop/) and follow the installation instructions for your operating system.

### 2. Open API Project in Visual Studio Code

1. Open Visual Studio Code.
2. Open the folder containing the API project.

### 3. Install Required npm Packages

Open the terminal in Visual Studio Code and run the following commands to install the required npm packages:

```bash
npm i express mssql cors dotenv morgan
```
Install nodemon as a development dependency:
```bash
npm i nodemon -D
```
### 4. Setup SQL Server with Docker
Run the following command in the terminal to start a SQL Server instance using Docker:
```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong#Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```
Verify that the Docker container is running:
```bash
docker ps
```
### 5. Connect to SQL Server using Visual Studio Code
1. Install the SQL Server (mssql) extension in Visual Studio Code.
2. Click on the SQL Server extension icon in the sidebar and select Add Connection.
3. In the connection settings, enter the following details:
- Server name: localhost
- Authentication Type: SQL Login
- User name: sa
- Password: yourStrong#Password
4. Check the option to save the password.
5. Click Connect.
6. A notification will appear at the bottom; click Enable Trust Server Certificate.
### 6. Execute Database Scripts
Navigate to the folder containing the API project in Visual Studio Code. Locate the database folder and find the db.sql file. Execute the SQL scripts contained in this file to set up the database schema and initial data.

Running the API
After completing the above steps, you can start the API by running:
```bash
npm run dev
```

To copy the repository from GitHub, follow these steps:

1.Open a terminal.
2.Run the following command to clone the repository
```bash
git clone https://github.com/MaxYRGZ/Ciberguardweb.git
```
Open the folder in Visual and then run the following command line in the terminal:
```bash
npm run dev
```
# Project Description

This project consists of two main views: one for saving emails to the database and another for displaying and graphing stored passwords.

## Views and Usage (Manual)

The project includes `APP.tsx`, which is responsible for routing and importing the two main views:

- `Mail.tsx`
- `Password.tsx`

### Mail Component

This React component renders a form for users to enter their email address and password. It includes validation to ensure the email format is correct. Upon clicking the "Save" button, the email and password are sent to a server (`http://localhost:3000/correos`) via a POST request. If successful, the form fields are cleared, and a success message is displayed; otherwise, an error message is shown. There is also a link to navigate to another route (`/password`). The component includes basic styling for layout and appearance.

### Password Component

This React component displays a list of passwords and allows each one to be copied or deleted. On load, it fetches passwords from a server (`http://localhost:3000/contrasena`). It also simulates a bar chart showing the distribution of passwords by month. The component includes a button to navigate to the mail view. Styled-components are used for styling, offering a responsive design.

## Running the Project

To run the project, navigate to the project directory and execute:
```bash
npm run dev
```
You can install the Thunder Client extension in Visual Studio Code to monitor database changes:

1. Save an email on the page.
2. Use Thunder Client to perform a GET request to http://localhost:3000/correos to see the change.
3. On the page, click the Password button.
4. View the stored passwords and delete one.
5.Use Thunder Client to perform a GET request to http://localhost:3000/contrasena to see the change.

# Test Description and Execution
## Test Description
The tests are designed to verify that the React application components render correctly and contain the expected elements.

### App Component
Verifies that the App component renders.
Uses screen.debug() to display output in the console.
### Mail Component
Verifies that the Mail component renders within the BrowserRouter.
Checks for the presence of labels and buttons: email, password, "Save" button, and link to the password view.
### Password Component
Verifies that the Password component renders within the BrowserRouter.
Checks for the presence of headers and the link button to the mail view.
## Running Tests
To run the tests, use the terminal to execute:

```bash
npm run test
```




























.
