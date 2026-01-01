package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (r router) getUser(ctx *gin.Context) {
	authHeader := ctx.Request.Header.Get("Authorization")
	user, err := r.service.GetUserFromAccessToken(authHeader)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func (r router) getUserById(ctx *gin.Context) {
	idstr := ctx.Param("id")
	if idstr == "" {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": "id param is empty",
		})
		return
	}

	id, err := strconv.Atoi(idstr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	user, err := r.service.GetUserById(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func (r router) updateUser(ctx *gin.Context) {
	newUserData := domain.UserUpdateDTO{}
	if err := ctx.ShouldBindJSON(&newUserData); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	authHeader := ctx.Request.Header.Get("Authorization")
	user, err := r.service.GetUserFromAccessToken(authHeader)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.UpdateUser(newUserData, user.Id); err != nil {
		if err == types.ErrUserNotFound {
			ctx.JSON(http.StatusNotFound, map[string]string{
				"message": err.Error(),
			})
			return
		}
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	newUser, err := r.service.GetUserById(user.Id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, newUser)
}
