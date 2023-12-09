# Speedometer API

![SpeedTag Logo](url_del_logo.png)

**Speedometer API** is the backend component of the SpeedTag mobile application. Built with Nest.js and Prisma, this API provides essential RESTful services for the application, enabling users to perform operations related to vehicle tracking, races, and more.

## Key Features

- **Secure Authentication:** Uses JWT (JSON Web Tokens) to ensure secure authentication and protect sensitive routes.
- **Database Interaction:** Utilizes Prisma as an ORM to interact with the MySQL database, facilitating data management.
- **Driver and Vehicle Tracking:** Offers dedicated endpoints for the management of drivers, vehicles, and races, providing full CRUD operations.
- **Custom Token Generation:** Allows the generation of custom tokens for various purposes within the application.

## Configuration

Before running the API, make sure to adjust the environment variables and configuration in the `.env` file. Additionally, install dependencies with `npm install`.

## Contributions

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
