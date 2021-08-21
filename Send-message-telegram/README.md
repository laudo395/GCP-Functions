# Function to send messages to telegram

## 1. Overview

This is an example of function that sends messages to telegram with Google Cloud Function. 
You can use to send Google alerts to telegram

## Requirements

- Serverless framework
- Nodejs
- gcloud (cli google cloud)


## Installation

Update the provider section on serverless.yml file with your credentials.

> Note: Don't forget you'll need update the telegram variables on serverless.yml file

Install the dependencies:

```sh
npm install
```


deploy the function:

```sh
serverless deploy
```

  