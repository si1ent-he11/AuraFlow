package api

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/si1ent-he11/AuraFlow/internal/app"
)

type router struct {
	service app.AppService
}

func NewRouter(service app.AppService) router {
	return router{
		service: service,
	}
}

func (r router) ReturnRouter() *gin.Engine {
	api := gin.New()
	api.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	auth := api.Group("/auth")
	{
		auth.POST("/signup", r.signUp)
		auth.POST("/signin", r.signIn)
		auth.POST("/refresh", r.refresh)
	}

	user := api.Group("/users")
	{
		user.GET("/", r.getUser)
	}

	return api
}
