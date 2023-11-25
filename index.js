#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2] || "me-app";
const projectPath = path.resolve(projectName);

const createApp = () => {
  if (projectPath !== ".") {
    fs.mkdirSync(projectPath);
    process.chdir(projectPath);
  }
  fs.writeFileSync(
    "package.json",
    `{
  "name": ${projectName},
  "version": "1.0.3",
  "description": "Mongoose + Express app created with create-me-app-js",
  "main": "server.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "nodemon": "^3.0.1",
    "dotenv": "^16.3.1",
  }
}
`
  );

  // Create server.js (your main app file)
  fs.writeFileSync(
    "server.js",
    `const express = require('express');
     const mongoose = require('mongoose');
     const app = express();
     app.use(express.json());
   require('dotenv').config();
//add connection string and port in an .env file
const port = process.env.port || 3000; 
const connectionString = process.env.connectionString;

mongoose.connect(connectionString).then(() => {
  app.listen(${port}, () => {
    console.log(\`Server is running on port ${port}\`);
  });
});
`
  );
  fs.writeFileSync(
    ".env",
    `connectionString = ;
  port = ;`
  );
  // Inform the user
  console.log(`\n${projectName} created successfully!\n`);
  console.log(
    `To start your app, run:\n\n  cd ${projectName} && npm install && npm start\n`
  );

};

if (fs.existsSync(projectPath)) {
  console.error(
    `Error: ${projectName} already exists. Please choose a different name.`
  );
  process.exit(1);
}

createApp();