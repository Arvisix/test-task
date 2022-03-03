## Requirements

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Clone the repository, install the dependencies.

```bash
$ cd <application-name>

$ cp .env.example .env

Start the application.

```bash
$ yarn build

$ yarn start # For production

$ yarn start:dev # For development
```

**Using Docker**

Make a copy of `.env.docker` and save as `.env`.

```bash
$ cp .env.docker .env
```

Install dependencies and run the application locally.

```bash
$ docker-compose up -d postgres

$ docker-compose up -d api

$ docker-compose exec api sh yarn migrate # Make sure server is started checking logs before running this command
```

View logs of the container.

```bash
$ docker-compose logs -f
```

To stop the services.

```bash
$ docker-compose stop api postgres
```
