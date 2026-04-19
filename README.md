# PetStore Docker Project

This project has been dockerized to run the MEAN stack (MongoDB, Express, Angular, Node.js) using Docker containers.

## Prerequisites

- Docker
- Docker Compose

## Running the Application

1. Clone or navigate to the project directory.

2. Build and start the services:
   ```bash
   docker-compose up --build
   ```

3. The application will be available at:
   - Frontend: http://localhost
   - Backend API: http://localhost:3001
   - MongoDB: localhost:27017

## Services

- **mongo**: MongoDB database
- **backend**: Node.js/Express API server
- **frontend**: Angular application served by Nginx

## Development

To run in detached mode:
```bash
docker-compose up -d --build
```

To stop the services:
```bash
docker-compose down
```

To view logs:
```bash
docker-compose logs -f [service_name]
```

## Environment Variables

The backend uses the following environment variables (set in docker-compose.yml):
- PORT: 3001
- DB_URI: mongodb://mongo:27017/petstorebd

## Database Management

### Viewing Database Content with MongoDB Compass

MongoDB Compass is a GUI tool for MongoDB that allows you to visually explore your data.

1. **Download and Install MongoDB Compass**:
   - Visit: https://www.mongodb.com/products/compass
   - Download and install the appropriate version for your operating system

2. **Connect to the Database**:
   - Open MongoDB Compass
   - Click **"Connect"** → **"Connect to..."**
   - Enter the following connection details:
     - **Host**: `localhost`
     - **Port**: `27017`
     - **Database**: `petstorebd` (optional - you can select it after connecting)
   - Leave authentication fields empty (no authentication configured)
   - Click **"Connect"**

3. **Explore Your Data**:
   - Once connected, you'll see the `petstorebd` database
   - Expand the database to see collections (e.g., `pets`)
   - Click on a collection to view documents
   - You can also use the query bar to filter and search data

### Alternative: Command Line Access

If you prefer the command line, you can also connect using mongo shell:

```bash
# Connect to MongoDB container
docker exec -it petstore-mongo mongosh

# Switch to the database
use petstorebd

# View collections
show collections

# Query data
db.pets.find()
```

## Notes

- The frontend proxies API calls to the backend through Nginx.
- MongoDB data is persisted in a Docker volume named `mongo_data`.