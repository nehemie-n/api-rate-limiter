# API rate limiter

The solution tackles three main challenges: handling excessive requests within a specific time window from a client, managing requests exceeding monthly limits for specific clients, and controlling overall system-wide request volume.

The solution uses <a target="__blank" href="https://nestjs.com/"><b>`NestJS`</b></a>, a progressive Node.js framework, so you will need to have ``NodeJS`` installed. For load testing, you will need to also have ``python`` installed.

For datbases, MongoDB was used, you will need access to a ``MongoDB`` instance, and for caching, a ``RedisDB`` instance.

## Installation

```bash
$ npm install
```

## Setting Up

You will need to set environment variables based on the env.ts sample or below example

```bash
JWT_SECRET=randomstring

# in 10 seconds, maximum requests are 1000
RATE_LIMIT_TTL=10
RATE_LIMIT_MAX=1000
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

## Load testing

You will need to install lucst python library to launch the load testing script. After installation, enter the lucust folder from the root repository folder and launch it.

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
