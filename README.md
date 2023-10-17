# API rate limiter

The solution tackles three main challenges: handling excessive requests within a specific time window from a client, managing requests exceeding monthly limits for specific clients, and controlling overall system-wide request volume.

The solution uses <a target="__blank" href="https://nestjs.com/"><b>`NestJS`</b></a>, a progressive Node.js framework, so you will need to have `NodeJS` installed. For load testing, you will need to also have `python` installed.

For datbases, MongoDB was used, you will need access to a `MongoDB` instance, and for caching, a `RedisDB` instance.

## Installation

From the root folder

```bash
$ npm install
```

## Setting Up

You will need to set environment variables based on the env.ts sample or below example.

```bash
JWT_SECRET=randomstring

# in 10 seconds, maximum requests are 1000
RATE_LIMIT_TTL=10
RATE_LIMIT_MAX=1000

# MongoDB
MONGO_URI=connection-uri

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

N.B:
You will also need to create/insert a sample user in MongoDB as below:

```json
{
  "email": "client@example.com",
  "password": "password",
  "monthlyRequestLimit": 10
}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

Below are the endpoints to use when testing the application

```json
{
  "/": "GET: For testing launch",
  "/auth/login": "POST: For logging in {email, password}",
  "/profile": "GET: For fetching your profile",
  "/upgrade": "POST: For upgrading the plan adds +5 request limit to the month"
}
```

## Load testing

You will need to install locust python library to launch the load testing script. After installation, enter the locust folder from the root repository folder and launch it.

```bash
# development
$ cd locust

# development
$ locust
```

## Test Codes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Nehemie](https://www.linkedin.com/in/nehemieniyomahoro/)
