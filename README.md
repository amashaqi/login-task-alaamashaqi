# Signin Application Frontend and Backend

## Backend services built with Nest and typescript with MongoDB

These are back-end services to be integrated with the Web Signin Application.

Services Supported:

Signup REST API (create new user)

1. Signup [POST] => /v1/auth/signup

Signin REST API (signin and generate a JWT Token for authentication)

1. Signin API and generate JWT Token [POST] => /v1/auth/signin

Welcome User REST API

1. Generate a welcome user message [GET] => /v1/auth/welcome

## Backend Installation and running Instructions

Installation:

- Make sure you have node version v20.11.1
- Change directory to signin-server then type yarn install

running:

- The port is 3008 if it's used change it
- For starting the server locally change directory to signin-server then type yarn start dev

## Frontend built with React and typescript

## Frontend Installation and running Instructions

Installation:

- Change directory to signin-web then type yarn install

running:

- The port is 3000 if it's used change it
- For starting the server locally change directory to signin-server then type yarn start
