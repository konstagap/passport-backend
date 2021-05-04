# Deployed version

https://redux-react-auth-app.herokuapp.com

# FrontEnd

https://github.com/konstagap/redux-react-auth-app

## Authentification with passport.js

This is a front-end part of the app, it is built with create-react-app, utilizes react-router for client-side routing, I also have some protected routes that are accessible after authorization.
For state management, I have used react-redux library, and redux-thunk middleware for async requests to get some memes.

## MAIN PURPOSE OF THIS APP

I have set up an Express app, connected to MongoDB Atlass where with help of Mongoose we can create and save user records. For authentication, I have used the Passport.js library with Local, Facebook, Google strategies. This authentification is session-based, I set up session id into httpOnly cookie so it is not accessible to malicious scripts. Cookie`s lifetime set to 1 day. I also use the express-session package to keep track of the sessions and save them to MongoDB.

## App needs more functionality for password reset

It is in progress now...
