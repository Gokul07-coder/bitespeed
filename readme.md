# Project Name

Reconciliation identity service

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Stacks Used](#stacks-used)

## Installation

1. Download the ZIP file and extract it
2. Install the dependencies using `npm install`.
3. The postgres is been hosted on render.com and running with an free trail period of 30 Days, expiring on July-5'24
4. The env includes the following credentials (Sample env format is provided)

## Usage

1. Start the application using `npm run dev`.
2. Open your browser and navigate to `http://0.0.0.0:3000`.
3. The API'S are been versioned under the tag v1
4. The path will be `domain.com/api/v1/endpoint`

## API Documentation

Ensure healthCheck of the Application is working by `http://hostpath:3000/api/v1/health`

## Stacks Used

1. Nodejs With Express framework and TYPESCRIPT as language
2. PostgreSQL as Database

## Task Work

1. Task work for an api endpoint named identify is done and can be accessed by `http://hostpath:3000/api/v1/customers/identify`
2. The above is an POST Request expecting an JSON Body and not an form-data
3. Example json request { "email" : "", "phoneNumber" : "" }
4. Logging is also done for capturing requests and the corresponding errors

## The below is the sample request from postman

![postman](./img/postman.png?raw=true "postman")

## A Kind Note

Render free tier has an limitation making request after an certian amount of inactivity makes the request take too long to respond
So kindly ensure health check before proceeding to test the identify endpoint
Thanks !!!

![note](./img/render.png.png?raw=true "Note")

## Logs sample image

![logs](./img/logs.png?raw=true "Logs")
