package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (r router) createInvite(ctx *gin.Context) {
	createInvite := domain.CreateInviteDTO{}
	if err := ctx.ShouldBindJSON(&createInvite); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	resp, err := r.service.CreateInvite(createInvite)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusCreated, resp)
}

func (r router) getInvitesBySpaceId(ctx *gin.Context) {
	spaceIdStr := ctx.Param("id")
	if spaceIdStr == "" {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": "id param is empty",
		})
		return
	}

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

	invites, err := r.service.GetInvitesBySpaceId(domain.SpaceMemberDTO{
		SpaceId: spaceId,
		UserId:  user.Id,
	})
	if err != nil {
		if err == types.ErrMemberNotFound {
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

	ctx.JSON(http.StatusOK, invites)
}

func (r router) deleteInvite(ctx *gin.Context) {
	inviteId := domain.InviteIdDTO{}
	if err := ctx.ShouldBindJSON(&inviteId); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.DeleteInvite(inviteId); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusNoContent)
}
