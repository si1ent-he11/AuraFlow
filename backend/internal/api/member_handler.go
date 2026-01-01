package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (r router) createSpaceMember(ctx *gin.Context) {
	createSpaceMemberDTO := domain.CreateSpaceMemberByInviteDTO{}
	if err := ctx.ShouldBindJSON(&createSpaceMemberDTO); err != nil {
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

	if createSpaceMemberDTO.UsernameInSpace == nil || *createSpaceMemberDTO.UsernameInSpace == "" ||
		len(*createSpaceMemberDTO.UsernameInSpace) < 6 {
		*createSpaceMemberDTO.UsernameInSpace = user.Username
	} else if len(*createSpaceMemberDTO.UsernameInSpace) < 6 || len(*createSpaceMemberDTO.UsernameInSpace) > 40 {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": "usernameInSpace must be between 6 and 40 characters",
		})
		return
	}

	if err := r.service.CreateSpaceMember(createSpaceMemberDTO, user.Id); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusOK)
}

func (r router) getMembersFromSpace(ctx *gin.Context) {
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

	spaceMembers, err := r.service.GetMembersFromSpace(domain.SpaceIdDTO{
		SpaceId: id,
	})
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, spaceMembers)
}

func (r router) GetRoleByUserId(ctx *gin.Context) {
	spaceId := domain.SpaceIdDTO{}
	if err := ctx.ShouldBindJSON(&spaceId); err != nil {
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

	role, err := r.service.GetRoleByUserId(
		domain.SpaceMemberDTO{
			SpaceId: spaceId.SpaceId,
			UserId:  user.Id,
		},
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, role)
}

func (r router) promoteMember(ctx *gin.Context) {
	member := domain.SpaceMemberDTO{}
	if err := ctx.ShouldBindJSON(&member); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.PromoteMember(member); err != nil {
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

	ctx.Status(http.StatusOK)
}

func (r router) demoteMember(ctx *gin.Context) {
	member := domain.SpaceMemberDTO{}
	if err := ctx.ShouldBindJSON(&member); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.DemoteMember(member); err != nil {
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

	ctx.Status(http.StatusOK)
}

func (r router) deleteMember(ctx *gin.Context) {
	member := domain.SpaceMemberDTO{}
	if err := ctx.ShouldBindJSON(&member); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.DeleteMember(member); err != nil {
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

	ctx.Status(http.StatusOK)
}
