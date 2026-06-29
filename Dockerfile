# Use the official Go image
FROM golang:1.25

# Set working directory
WORKDIR /app

# Copy Go module files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the project
COPY . .

# Build the application
RUN go build -o main .

# Expose backend port
EXPOSE 8082

# Run the application
CMD ["./main"]