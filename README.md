# Instructions to run this Project

## We are working with Postgres Database and Prisma Technologies

## Create thos enviroment variables in a .env file as we will need them

- DATABASE_URL="postgresql://postgres:Davidwagih123@localhost:5432/mydb?schema=public"
- GITHUB_ID = 1879816fe56414010309
- GITHUB_SECRET = 49a1eae43382ca1e4f98596efb1a5fa6861463d5
- JWT_SECRET = dazy123\*
- NEXTAUTH_URL = "http://localhost:3000"

## to setup and connect to the database you must first install postgres on your machine

- After you installed postgres on your machine and made sure that it is running correctly do the following
- Open the Command line and type psql -U "yourUserinPostgre"
- then write your User 's password
- CREATE DATABASE mydb;
- CREATE USER postgres WITH PASSWORD 'Davidwagih123';
- GRANT ALL PRIVILEGES ON DATABASE mydb TO postgres;

### you now have created the needed setup to connect to the database

- to run the up migrations here write in the command : npx prisma migrate dev
- to run the down migrations here write in the command : npx prisma migrate reset

## Port Numbers

- the Backend Port is 3000 , database Port is 5432

## to install all the Packages used

npm install

## to start the server and running the project

npm run dev
