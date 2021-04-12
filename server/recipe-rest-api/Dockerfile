# run 'docker build .' to build the Docker image

# first line is image you're inheriting dockerfile from
# alpine is a lightweight docker image that runs python 3.7
# go to hub.docker.com to find images
FROM python:3.7-alpine
MAINTAINER Karl Rezansoff

# ENV is used for setting an environment variable
# runs python in unbuffered mode, which is reccommended for running
# python in Docker containers
ENV PYTHONUNBUFFERED 1

# Copy our requirements.txt to our Docker image
COPY ./requirements.txt /requirements.txt

# alpine package manager adds postgres client
# updates our registry before we add it
# no cache means it wont store index in Dockerfile
RUN apk add --update --no-cache postgresql-client jpeg-dev

# Virtual sets up an alias so we can easily remove those
# dependancies later
RUN apk add --update --no-cache --virtual .tmp-build-deps \
      gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev

# Install all dependencies listed in requirements.txt
# Go to pypi.org to find these
RUN pip install -r /requirements.txt

# Deleting our temp dependancies we created above
RUN apk del .tmp-build-deps

# Creating directory to store our application source code
RUN mkdir /app

# Defining default directory
# Apps will run starting at WORKDIR
WORKDIR /app

# Copy our application source code to the Docker container
COPY ./app /app

RUN mkdir -p /media
RUN mkdir -p /static
RUN mkdir -p /vol/web
# creating new user with -D priviledges and switching to that user
# default user is root, so this method is safer
RUN adduser -D user
# Sets ownership of /vol/ to our custom user
RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web
USER user
