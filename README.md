This is a project for my own Home App. The Backend-Server is built with node.js and express. PostgreSQL is used for the Database. Server and Database are hosted in Docker Containers.
The Mobile App is built with React Native. I'm running it on Android, I haven't testet it for iOS.

## Installation

# To run the project locally use the following steps:

- Make sure you have Docker installed on your system: https://docs.docker.com/engine/install/
- On Windows you can run the rebuild.ps1 powershell script inside the backend/scripts folder to spin up the Backend Server and Database

# The Mobile App can be run on an Android emulator:

- Set up the emulator on your machine: https://reactnative.dev/docs/environment-setup?guide=native
- On the very top of the App.tsx file inside the frontend folder you can edit the HOSTNAME variable, make sure you type in the hostname or IP-Adress of your own device
- Spin up the Android emulator through Android Studio
- make sure the current working directory is the frontend folder
- run "npm install" to install the necessary node modules
- run "npm start" inside the frontend folder to start the mobile app
- inside the emulator the app should open up automatically
