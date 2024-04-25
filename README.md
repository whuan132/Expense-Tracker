# Expense Tracker Application

This is a web application built with Spring Boot for the backend, React for the frontend, and MySQL for the database. The application helps users track their expenses, manage budgets, and analyze spending habits.

## Setup Instructions

### Backend (Spring Boot)

1. Clone the repository:

```bash
git clone https://github.com/your-username/expense-tracker.git
```

2. Navigate to the backend directory:

```bash
cd expense-tracker/backend
```

3. Update the database configuration in `src/main/resources/application.properties` with your MySQL database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=your-username
spring.datasource.password=your-password
```

4. Build the Spring Boot application:

```bash
./mvnw clean package
```

5. Run the application:

```bash
java -jar target/expense-tracker.jar
```

### Frontend (React)

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

### Database (MySQL)

1. Install MySQL and create a new database named `expense_tracker`.

2. Run the database script provided in `backend/src/main/resources/schema.sql` to create the necessary tables.

## Running the Application

Once the backend server and frontend development server are running, you can access the Expense Tracker application in your web browser at `http://localhost:3000`.

## Deployment with Docker Compose

To deploy the application using Docker Compose:

1. Make sure Docker and Docker Compose are installed on your system.

2. Navigate to the project root directory.

3. Run the following command to build and run the Docker containers:

```bash
docker-compose up --build
```

4. Access the application in your web browser at `http://localhost:3000`.

## Additional Notes

- Make sure all required ports (e.g., 8080 for backend, 3000 for frontend) are not in use by other applications.
- Customize the application as needed for your specific requirements.