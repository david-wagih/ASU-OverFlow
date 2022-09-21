# Next Js with Typescript Project

## A fully functional project written in Typescript to create an app like stack-overFlow to help developers share their knowledge

This project was built from scratch to be something like stack-overFlow for developers to:

- Ask questions with specifying the category of that question [Web Development, Mobile Development, Artificial Intelligence, Machine Learning]
- Answer other developers questions
- Add replies to other developers answers
- and even there is that upVoting and downVoting feature.
- Send request for the admin to get the privilege to answer questions on the app

There is also an Administration Role, where admins can:

- View all registered Users
- Can restrict access for some Users to make them not able to ask or answer questions
- Can accept or reject Users Requests for Answering Privilege

## How to install this project and run it

1. Clone this project
2. Install all the packages - `npm i`
3. Setup your key:
   1. create .env file
   2. paste this - `DATABASE_URL = postgres://<user>:<password>@localhost:5432/<databaseName>`
   3. paste this - `NEXT_PUBLIC_HOST = http://localhost:3000`
4. Setup postgres and pgAdmin on your machine and create a database with the same name in the key above
5. then run this command for migrating the models of the database - `npx prisma db push`
6. now, you are good to run the app - `npm run dev`
