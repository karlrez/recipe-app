# Recipe App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start the React App
- cd into /recipe-app/client
- run: npm install
- run: npm start

## Start the Django Server
The Django project that serves as a backend for the recipe app. Provides api endpoints for creating a user account, uploading recipes, following users, and 'liking' recipes.  

## Build from docker file
cd into base directory and run:
  - sudo docker build .
  - sudo docker-compose build
  
And start development server:
  - sudo docker-compose up
  
To migrate any changes to the db:
  - sudo docker-compose run app sh -c 'python manage.py migrate'
  

And then you can view and interact with the endpoints at 127.0.0.1:8000

![Alt text](server/recipe-rest-api/app/media/screenshot.png?raw=true "screenshot")
