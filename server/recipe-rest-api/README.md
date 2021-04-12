# recipe-rest-api

## Description
Django project that serves as a backend for a recipe app. Provides api endpoints for creating a user account, uploading recipes, following users, and 'liking' recipes.  

## Build from docker file
cd into base directory and run:
  - sudo docker build .
  - sudo docker-compose build
  
And start development server:
  - sudo docker-compose up
  
To migrate any changes to the db:
  - sudo docker-compose run app sh -c 'python manage.py migrate'
  

And then you can view and interact with the endpoints at 127.0.0.1:8000

![Alt text](app/media/screenshot.png?raw=true "screenshot")
