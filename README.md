# Memory in the Shell

We love the `shell`. [bash](#) or [zsh](#) or [fish](#) or [powershell](#) or name
your own. But the `shell` forgets, especially when we are across multiple
systems. It would be incredible if the `shell` could *safely* remember things for us,
across systems. So let us extend the `shell` to remember things for us.

## Problem

The overall system will probably have multiple components. It may also need to
handle some of the nuances of each shell. But we love to keep things simple.
So, let us first build a simple API that can store the typed commands.

### Requirements

1. The API should be able to store the commands typed by the user.
2. The API should be able to search the command history by keyword.

For example, the following command should store a `command`:

```bash
curl -X POST http://localhost:8080/api/v1/commands -d "command=ls -l"
```

Example command to search history:

```bash
curl -X GET http://localhost:8080/api/v1/commands?keyword=ls
```

## Prerequisites

To run this application, you’ll need:

- Docker and Docker Compose installed.
- (Optional) Node.js and npm if you want to run the app without Docker.

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/sabhisharma-ise/memory-in-the-shell.git
cd memory-in-the-shell
```
2. Set up environment variables: Create a `.env` file in the root directory with your PostgreSQL configuration:

```bash
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
```

3. Database Initialization: The application uses an `init.sql` file to initialize the database with a `commands` table containing `id`, `command`, and `timestamp` fields.

## Running the Application

### Using Docker Compose

1. Build and start the application:

    ```bash
    docker-compose up --build
    ```
    This command will:

    - Start a PostgreSQL database and initialize it with the required table structure.
    - Start the Express server.

2. Stopping the application: To stop the application, press Ctrl+C in the terminal where it’s running, then run:

    ```bash
    docker-compose down
    ```

## Database Schema

The commands table is structured as follows:

| Column    | Type | Description
| -------- | ------- | -----------
| `id`  | `SERIAL`    | Unique ID for each command entry
| `command` | `TEXT`     | The shell command
| `timestamp`    | `TIMESTAMP`    | The timestamp for when the command was added

