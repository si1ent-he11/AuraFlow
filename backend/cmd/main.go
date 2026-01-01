package main

import (
	"log"
	"os"

	server "github.com/si1ent-he11/AuraFlow/internal"
	"github.com/si1ent-he11/AuraFlow/internal/api"
	"github.com/si1ent-he11/AuraFlow/internal/app"
	data "github.com/si1ent-he11/AuraFlow/internal/db"
	"github.com/si1ent-he11/AuraFlow/pkg/auth"
)

func main() {
	db, err := data.InitDb("postgres://postgres:1415@db:5432/app?sslmode=disable", 10)
	if err != nil {
		log.Fatal(err)
	}
	auth := auth.NewAuthService(
		os.Getenv("ACCESS_KEY"), os.Getenv("REFRESH_KEY"),
	)
	service := app.NewService(db, auth)
	router := api.NewRouter(service)

	server := server.NewServer(router.ReturnRouter(), os.Getenv("APP_PORT"))
	if err := server.Run(); err != nil {
		log.Fatal(err)
	}
}
