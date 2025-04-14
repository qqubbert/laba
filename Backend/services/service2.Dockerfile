# Go Service Dockerfile
FROM golang:1.23.1

WORKDIR /app

# Copy only the go.mod file
COPY services/go.mod ./

# Download Go dependencies
RUN go mod download

# Copy the Go service file
COPY services/service2.go .

# Build the Go service (optional)
RUN go build -o service2 service2.go

CMD ["./service2"]
