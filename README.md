# gotta-catch-em-all

## RENDER LINK

Deployed server live here, hosted on Render. Deployed server connected to PostgreSQL 14 instance also hosted on Render.

https://gotta-catch-em-all.onrender.com

## Problem Domain

Create an Express server connected to SQL database that allows users to sign up, confirm identity with basic authentication (username/password) or bearer authentication (JSON web token), and then perform CRUD functions on the database. Users have role based access control (permissions) that restrict CRUD access to certain functions only depending on role.

## Whiteboard

![First Whiteboard, showing roles and database models](./img/pokemon-app-whiteboard.png)

## Method

Express app written based on previous labs.

## Testing

Tests written for jest/supertest that validate CRUD routes and logger middleware. Tests were not written for authentication middleware because of limited time. Authentication middleware was tested with console logs, Thunderclient extension for VSCode, and "curl" shell commands.
