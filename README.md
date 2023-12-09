# Speedometer API

Speedometer API is a backend service for the SpeedTag application. This project is built using the NestJS framework with Prisma for database interactions.

## Getting Started

### Installation

````bash
$ npm install
```bash
$ npm install
````

## Configuración de la Base de Datos Local

Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

DATABASE_URL="mysql://usuario:contraseña@host:puerto/nombredelabasededatos"
JWT_SECRET=

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger API Documentation

Explore the API documentation using Swagger. The Swagger interface is available at the following URL:
[**Swagger API Documentation**](http://localhost:3000/api/swagger)
Make sure your server is running before trying to access the documentation.

## Configuration

Before running the application, make sure to set up the required environment variables. Copy the .env.example file to .env and fill in the necessary values.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.
