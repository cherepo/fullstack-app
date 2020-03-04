# AWS lambda api

[From here](https://hackernoon.com/building-a-serverless-rest-api-with-node-js-and-mongodb-2e0ed0638f47)
[Git Repo](https://github.com/adnanrahic/building-a-serverless-rest-api-with-nodejs/blob/master/serverless.yml)
[Serverless CORS](https://serverless.com/blog/cors-api-gateway-survival-guide/)

# Development
Before run or deploy, need to create env file variables.env to contain

```
DB=mongodb://appuser:<password>@ds061395.mlab.com:61395/cheapp
```

To run locally

```
sls offline start --skipCacheInvalidation
```

To delpoy

```
# if not logged in
serverless login

export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>

serverless deploy
```


# Server Info
Service Information
service: aws-rest
stage: dev
region: us-east-1
stack: aws-rest-dev
resources: 43
api keys:
  None
endpoints:
  POST - https://vshb53js6h.execute-api.us-east-1.amazonaws.com/dev/notes
  GET - https://vshb53js6h.execute-api.us-east-1.amazonaws.com/dev/notes/{id}
  GET - https://vshb53js6h.execute-api.us-east-1.amazonaws.com/dev/notes
  PUT - https://vshb53js6h.execute-api.us-east-1.amazonaws.com/dev/notes/{id}
  DELETE - https://vshb53js6h.execute-api.us-east-1.amazonaws.com/dev/notes/{id}