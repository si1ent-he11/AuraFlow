FROM golang AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o myapp ./cmd/main.go

FROM alpine
WORKDIR /root
COPY --from=builder /app/myapp .
EXPOSE 8080
CMD [ "./myapp" ]