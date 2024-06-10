Author: Karen Kurginyan
Date: 10.06.2024

# NestJS Project

## Description

This is a NestJS project that includes three modules: Users, Authors, and Books. Users can register, log in to the application, and interact with the Postgres database. Authentication is done using JWT tokens.

## Installation

1. Clone the repository

   ```bash
   git clone <https://github.com/KarenKuro/NestBooksCatalog>
   ```
   
2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=your_nest_project
   JWT_SECRET=your_jwt_secret
   SALT=your_salt
   ```

## Running the Project

To start the application in development mode, use the following command:

```bash
npm run start:dev
```

GitHub repository: https://github.com/KarenKuro/NestBooksCatalog