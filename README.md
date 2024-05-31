
Instrucciones de instalación y ejecución.
# API Setup and Configuration

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

Descripción del proyecto (estructura y uso del proyecto)
Prototipos de la vista y cómo utilizarlas (tipo manual)
Descripción de las pruebas y cómo ejecutarlas.
URL de despliegue en Vercel.




























.
