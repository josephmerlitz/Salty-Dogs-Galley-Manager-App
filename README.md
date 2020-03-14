##You can follow the below steps to install and run the app:

1. Rename the file **.env.example** to **.env**
2. Create a MongoDB database and configure the database connection string **MONGODB_URI** in your **.env** file
3. Create **AWS S3** account and configure **ACCESS_KEY_ID** and **ACCESS_KEY** in your **.env** file
4. Move to the **project** directory and run **npm install**
5. Move to the **clien**t directory and run **npm isntall**
6. Start the app by moving to the project directory and then running the command **npm run dev**

##To deploy to heroku:

1. Copy the project to your desktop
2. cd into the project folder and delete the .git folder
3. git init
4. cd client
5. npm run build
6. delete everything in the client folder except build folder
7. heroku login
8. heroku create project-name
9. git add .
10. git commit -m "message"
11. git push heroku master
