# Mock-Eateries

Mock-Eateries is an online restaurant platform that provides users with good recipes for cooking.

[![npm version](https://badge.fury.io/js/express.svg)](https://badge.fury.io/js/express)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

## Table of Contents

- [API](#api)
- [API Documentation](#api-documentation)
- [Technologies](#technologies)
- [Installing](#installing)
- [Working Routes](#working-routes)
- [License](#license)

# API

The API is currently in version 1 (v1) and is hosted at https://mock-eateries.herokuapp.com

# API-Documentation

The API endpoints are documented using POSTMAN and can be accessed here [API-Docs](https://documenter.getpostman.com/view/6464518/SVzxXeb9)

## Required Features

- Users can sign up.
- Admin can sign up.
- Users can login.
- Admin can create recipe categories
- Admin can delete recipe categories
- Admin can edit recipe categories
- Users can view all categories
- Users can view single categories
- Admin can create a recipe under a category
- Admin can edit a recipe under a category
- Admin can delete a recipe under a category
- Users can view a single recipe under a category
- Users can view all recipe under a category
- Public users can perform robust search of recipe or categories

# Technologies

- NodeJs
- Express
- Jest & SuperTest
- ESLint
- Babel
- Redis
- Docker
- PostgreSQL
- Sequelize

# Installing

#### _Prerequisites_

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed, go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

To install this app

`git clone https://github.com/mekzy-o/mock-eateries`

And install the required dependencies

`npm install`

Run server

`npm run start:dev`

Server listens on port `8080`

## Running the tests

To run test cases

`npm test`

# Working Routes

## _API Endpoints_

| Endpoint                                         |            Functionality            | HTTP method |
| ------------------------------------------------ | :---------------------------------: | ----------: |
| /api/v1/auth/signup                              |        Create a user account        |        POST |
| /api/v1/admin/auth/signup                        |       Create an admin account       |        POST |
| /api/v1/auth/login                               |            Login a user             |        POST |
| /api/v1/category                                 |          Create a Category          |        POST |
| /api/v1/category                                 |          Delete a Category          |      DELETE |
| /api/v1/category/:id                             |      Get a specific a category      |         GET |
| /api/v1/category                                 |         Get all Categories          |         GET |
| /api/v1/category/:id                             |      Edit a specific category       |       PATCH |
| /api/v1/category/:categoryId/recipe              |           Create a Recipe           |        POST |
| /api/v1/category/:categoryId/recipe/:recipeId    |      Delete a specific Recipe       |      DELETE |
| /api/v1/category/:categoryId/recipe/:recipeId    |       Edit a specific recipe        |       PATCH |
| /api/v1/category/:categoryId/recipe/:recipeId    |        Get a specific recipe        |         GET |
| /api/v1/category/:categoryId/recipe              |  Get all Recipes under a category   |         GET |
| /api/v1/search?keyword='keyword'&filter=recipe   | Search for recipes using a keyword  |         GET |
| /api/v1/search?keyword='keyword'&filter=category | Search for category using a keyword |         GET |


## License :boom:

This project is under the MIT LICENSE
