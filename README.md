# Instructions to run this Project

## We are working with Postgres Database and Prisma Technologies and Node JS

- first of All make sure to install Node on your machine and make sure that you install this version 16.14.0.
  <https://nodejs.org/en/>

## Create thos enviroment variables in a .env file as we will need them

- DATABASE_URL="postgresql://software:Project@localhost:5432/mydb?schema=public"
- GITHUB_ID = 1879816fe56414010309
- GITHUB_SECRET = 49a1eae43382ca1e4f98596efb1a5fa6861463d5
- JWT_SECRET = dazy123\*
- NEXTAUTH_URL = "http://localhost:3000"

## to setup and connect to the database you must first install postgres on your machine

- Link to install Postgres <https://www.postgresql.org/download/>
- After you installed postgres on your machine
- open your Postgres Folder you downloaded and then go in the bin folder and then copy the file path and add it in the path variable in the System's enviroment Variables on your machine
- Open the Command line and type psql -U postgres
- then write your password when installed postgreSQL
- CREATE DATABASE mydb;
- CREATE USER software WITH PASSWORD 'Project';
- GRANT ALL PRIVILEGES ON DATABASE mydb TO software;
- ALTER USER software WITH SUPERUSER;

### you now have created the needed setup to connect to the database

- to run the up migrations here write in the command : npx prisma migrate dev
- to run the down migrations here write in the command : npx prisma migrate reset

## Port Numbers

- the Backend Port is 3000 , database Port is 5432

## to install all the Packages used

npm install

## to start the server and running the project

npm run dev
