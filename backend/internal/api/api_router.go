package api

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/si1ent-he11/AuraFlow/internal/domain/interfaces/service"
)

type router struct {
	service service.AppService
}

func NewRouter(service service.AppService) router {
	return router{
		service: service,
	}
}

func (r router) ReturnRouter() *gin.Engine {
	api := gin.New()
	api.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND")},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	auth := api.Group("/auth")
	{
		auth.POST("/signup", r.signUp)
		auth.POST("/signin", r.signIn)
		auth.POST("/refresh", r.refresh)
		auth.POST("/logout", r.logout)
	}

	user := api.Group("/users")
	{
		user.GET("/", r.getUser)
		user.GET("/:id", r.getUserById)
		user.PATCH("/", r.updateUser)
	}

	spaces := api.Group("/spaces")
	{
		spaces.GET("/", r.getSpacesByUserId)
		spaces.GET("/:id", r.getSpaceById)
		spaces.POST("/", r.createSpace)
		spaces.DELETE("/:id", r.leaveSpace)

		spaces.GET("/:id/members", r.getMembersFromSpace)
		spaces.POST("/members", r.createSpaceMember)
		spaces.PATCH("/members/promote", r.promoteMember)
		spaces.PATCH("/members/demote", r.demoteMember)
		spaces.DELETE("/members", r.deleteMember)

		spaces.GET("/:id/invites", r.getInvitesBySpaceId)
		spaces.POST("/invites", r.createInvite)
		spaces.DELETE("/invites", r.deleteInvite)
	}

	return api
}
