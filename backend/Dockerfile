# Use the official Golang image as the base image
FROM golang:1.21.3-alpine3.18

# Set the working directory
WORKDIR /app

# Copy your Go application files to the container
COPY . .

# Build the Go application
RUN go run migrations/migration.go
RUN go build -o main

# Expose the port your Go application will run on
EXPOSE 8080

# Command to run the application
CMD ["./main"]
