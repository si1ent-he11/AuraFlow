package api

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
)

func (r router) createTaskGroup(ctx *gin.Context) {
	var tg domain.CreateTaskGroupDTO
	if err := ctx.ShouldBindJSON(&tg); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	spaceIdStr := ctx.Param("id")
	spaceId, err := strconv.Atoi(spaceIdStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
	}

	authHeader := ctx.Request.Header.Get("Authorization")
	user, err := r.service.GetUserFromAccessToken(authHeader)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.SetupNewTaskGroup(tg, domain.SpaceMemberDTO{
		SpaceId: spaceId,
		UserId:  user.Id,
	}); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusCreated)
}

func (r router) getTasksGroupsBySpaceId(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	tg, err := r.service.GetTasksGroupsBySpaceId(id)
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"ID":       -1,
			"name":     "not found",
			"minScore": 0,
			"maxScore": 0,
		})
		return
	}

	ctx.JSON(http.StatusOK, tg)
}

func (r router) getTaskGroupById(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	tg, err := r.service.GetTaskGroupById(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, tg)
}

func (r router) createTask(ctx *gin.Context) {
	task := domain.CreateTaskDTO{}
	if err := ctx.ShouldBindJSON(&task); err != nil {
		log.Println(err)
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	taskId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.AddTaskToGroup(task, taskId); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusCreated)
}

func (r router) getGroupTasks(ctx *gin.Context) {
	groupID, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	tasks, err := r.service.GetGroupTasks(groupID)
	if err != nil {
		log.Println(err)
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, tasks)
}

func (r router) setGrade(ctx *gin.Context) {
	var grade domain.Grade
	if err := ctx.ShouldBindJSON(&grade); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.SetMemberGrade(grade); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusOK)
}

func (r router) getMemberHistory(ctx *gin.Context) {
	memberID, _ := strconv.Atoi(ctx.Param("id"))
	groupID, _ := strconv.Atoi(ctx.Param("group_id"))

	history, err := r.service.GetMemberHistory(memberID, groupID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, history)
}
