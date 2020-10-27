## 📒 Description

A scalable and modern TypeScript task management back-end application developed following best practices using NestJS, Node.js and TypeScript

## 🥞 Tech Stack

Backend application was created with:

- Created with [NestJS](https://nestjs.com/), a [Node.js](https://nodejs.org/en/) framework for building efficient, reliable and scalable server-side applications
- Developed in [TypeScript](https://www.typescriptlang.org/).  
- [PostgresSQL](https://www.postgresql.org/) database
- Used [TypeORM](https://typeorm.io/#/) to interact with the database
- United tested using [Jest](https://jestjs.io/)
- Manually tested during development using [Postman](https://www.postman.com/)
- User authentication built using [Passport.js](http://www.passportjs.org) middleware
- Passwords encrypted/hashed using [bcryptjs](https://www.npmjs.com/package/bcrypt) package
- Incoming data validated using the [class-validator](https://github.com/typestack/class-validator) package


## 💡 &nbsp; Key Concepts / Project Overview

- Designed and developed REST APIs performing CRUD operations
- Used an ORM for database interaction
- Implemented authentication and authorization mechanisms
- Guarded endpoints for authorized users using Guards
- Gained practical experience with JSON Web Tokens (JWTs)
- Implemented data validation using Pipes
- Implemented password encryption and learnt about security best practices + basic cryptography
- Used pgAdmin4 to manage PostgreSQL databases
- Used Postman for testing back-end services
- Unit tested application using Jest with an Istanbul setup
- Learnt more about TypeScript best practices

## 🚀 Development

To get started:

```sh
git clone https://github.com/j-bunk/managed-by-j.git
cd managed-by-j
npm install
npm start
// (Optional) Run tests
npm run test
```
*Please note that a local database would need to be set up and configured to use full functionality.*

### 📁 Project Structure

The project is split into the following parts:

- `/src` contains most of the code:
  - `/auth` contains code relating to user authentication.
  - `/config` contains configuration file to connect ORM and datbase.
  - `/tasks` contains code relating to task management (task management CRUD operations and more).

#### ➕ Commit Types

Commits are prefixed with the following codes to denote their purpose:

- `feat[-XX]/`: Implementation of feature or enhancements/optimizations.
- `fix[-XX]/`: Fixes for bugs and basic refactoring.

#### ❗ Commit Message Format

*This format is a simplified version of the [AngularJS commit message format](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).*

```
<type>: <short summary>
  │           │
  │           └─⫸ No period at the end
  │
  └─⫸ Commit Type: feat|fix
```

## 🔮 Future Features

- Achieve 100% testing code coverage
- Create a front-end application using React
- Deploy application using AWS Elastic Beanstalk
