package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
