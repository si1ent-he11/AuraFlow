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
		user.GET("/:id", r.getUserById)
		user.GET("/", r.getUser)
		user.PATCH("/", r.updateUser)
	}

	spaces := api.Group("/spaces")
	{
		spaces.GET("/", r.getSpacesByUserId)
		spaces.GET("/members/:id", r.getMemberByMemberId)
		spaces.POST("/", r.createSpace)

		spaces.PATCH("/members/promote", r.promoteMember)
		spaces.POST("/members", r.createSpaceMember)
		spaces.PATCH("/members/demote", r.demoteMember)
		spaces.DELETE("/members", r.deleteMember)

		spaces.POST("/invites", r.createInvite)
		spaces.DELETE("/invites", r.deleteInvite)
	}

	inSpace := spaces.Group("/:id")
	inSpace.Use(r.memberAccessMiddleware())
	{
		inSpace.GET("/admins", r.getAdminsFromSpace)
		inSpace.GET("/members", r.getMembersFromSpace)
		inSpace.GET("/members/:member_id", r.getMemberByMemberId)
		inSpace.GET("", r.getSpaceById)
		inSpace.PATCH("/name", r.changeSpaceName)
		inSpace.PATCH("/desc", r.changeSpaceDesc)
		inSpace.DELETE("", r.leaveSpace)

		inSpace.GET("/members/me", r.getMember)
		inSpace.PATCH("/members", r.updateMemberUsername)

		inSpace.GET("/invites", r.getInvitesBySpaceId)
	}

	spacesTasks := api.Group("/spaces")
	{
		spacesTasks.POST("/:id/task-groups", r.createTaskGroup)
		spacesTasks.GET("/:id/task-groups", r.getTasksGroupsBySpaceId)
		spacesTasks.GET("/task-groups/:id", r.getTaskGroupById)

		spacesTasks.POST("/task-groups/:id/tasks", r.createTask)
		spacesTasks.GET("/task-groups/:id/tasks", r.getGroupTasks)

		spacesTasks.POST("/grades", r.setGrade)
		spacesTasks.GET("/members/:id/task-groups/:group_id/history", r.getMemberHistory)
	}

	return api
}
