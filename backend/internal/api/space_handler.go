package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (r router) createSpace(ctx *gin.Context) {
	createSpaceDTO := domain.CreateSpaceDTO{}
	if err := ctx.ShouldBindJSON(&createSpaceDTO); err != nil {
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

	if createSpaceDTO.UsernameInSpace == nil || *createSpaceDTO.UsernameInSpace == "" ||
		len(*createSpaceDTO.UsernameInSpace) < 6 {
		*createSpaceDTO.UsernameInSpace = user.Username
	} else if len(*createSpaceDTO.UsernameInSpace) < 6 || len(*createSpaceDTO.UsernameInSpace) > 40 {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": "usernameInSpace must be between 6 and 40 characters",
		})
		return
	}

	if err := r.service.CreateSpace(createSpaceDTO, domain.AddOwnerToSpaceRequestDTO{
		UserId:          user.Id,
		UsernameInSpace: *createSpaceDTO.UsernameInSpace,
	}); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusCreated)
}

func (r router) getSpacesByUserId(ctx *gin.Context) {
	authHeader := ctx.Request.Header.Get("Authorization")
	user, err := r.service.GetUserFromAccessToken(authHeader)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, map[string]string{
			"message": err.Error(),
		})
		return
	}

	spaces, err := r.service.GetSpacesByUserId(user.Id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, spaces)
}

func (r router) getSpaceById(ctx *gin.Context) {
	idstr := ctx.Param("id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	space, err := r.service.GetSpaceById(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, space)
}

func (r router) leaveSpace(ctx *gin.Context) {
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

	if err := r.service.LeaveSpace(domain.SpaceMemberDTO{
		SpaceId: spaceId,
		UserId:  user.Id,
	}); err != nil {
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

func (r router) changeSpaceName(ctx *gin.Context) {
	newDesc := domain.SpaceNameDTO{}
	if err := ctx.ShouldBindJSON(&newDesc); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

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

	if err := r.service.ChangeSpaceName(domain.SpaceMemberDTO{
		SpaceId: spaceId,
		UserId:  user.Id,
	}, newDesc.SpaceName); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusOK)
}
func (r router) changeSpaceDesc(ctx *gin.Context) {
	newDesc := domain.SpaceDescriptionDTO{}
	if err := ctx.ShouldBindJSON(&newDesc); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

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

	if err := r.service.ChangeSpaceDesc(domain.SpaceMemberDTO{
		SpaceId: spaceId,
		UserId:  user.Id,
	}, newDesc.SpaceDescription); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusOK)
}
