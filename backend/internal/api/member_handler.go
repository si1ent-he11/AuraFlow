package api

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (r router) memberAccessMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		spaceIdParam := ctx.Param("id")
		spaceId, err := strconv.Atoi(spaceIdParam)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid space id"})
			return
		}

		authHeader := ctx.Request.Header.Get("Authorization")
		user, err := r.service.GetUserFromAccessToken(authHeader)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, map[string]string{
				"message": err.Error(),
			})
			return
		}

		isMember, err := r.service.MemberExists(domain.SpaceMemberDTO{
			SpaceId: spaceId,
			UserId:  user.Id,
		})
		if err != nil || !isMember {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"message": "you are not a member of this space",
			})
			return
		}

		ctx.Next()
	}
}

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
	spaceIdStr := ctx.Param("id")
	id, err := strconv.Atoi(spaceIdStr)
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

func (r router) getMemberByMemberId(ctx *gin.Context) {
	spaceIdstr := ctx.Param("id")
	spaceId, err := strconv.Atoi(spaceIdstr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	memberIdstr := ctx.Param("member_id")
	memberId, err := strconv.Atoi(memberIdstr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	member, err := r.service.GetMemberByMemberId(memberId, spaceId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, member)
}

func (r router) getAdminsFromSpace(ctx *gin.Context) {
	idstr := ctx.Param("id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	spaceMembers, err := r.service.GetAllAdminsFromSpace(domain.SpaceIdDTO{
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

func (r router) getMember(ctx *gin.Context) {
	spaceIdStr := ctx.Param("id")
	spaceId, err := strconv.Atoi(spaceIdStr)
	if err != nil {
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

	member, err := r.service.GetMember(
		domain.SpaceMemberDTO{
			SpaceId: spaceId,
			UserId:  user.Id,
		},
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, member)
}

func (r router) updateMemberUsername(ctx *gin.Context) {
	memberName := domain.UserNameInSpaceDTO{}
	if err := ctx.ShouldBindJSON(&memberName); err != nil {
		log.Println(err)
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

	if err := r.service.UpdateMemberUsername(domain.UpdateSpaceMemberDTO{
		SpaceId:         spaceId,
		UserId:          user.Id,
		UserNameInSpace: memberName.UserNameInSpace,
	}); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.Status(http.StatusOK)
}

func (r router) promoteMember(ctx *gin.Context) {
	member := domain.SpaceMemberDTO{}
	if err := ctx.ShouldBindJSON(&member); err != nil {
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

	if err := r.service.PromoteMember(member, user.Id); err != nil {
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

	authHeader := ctx.Request.Header.Get("Authorization")
	user, err := r.service.GetUserFromAccessToken(authHeader)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.DemoteMember(member, user.Id); err != nil {
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

	authHeader := ctx.Request.Header.Get("Authorization")
	user, err := r.service.GetUserFromAccessToken(authHeader)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.DeleteMember(member, user.Id); err != nil {
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

	ctx.Status(http.StatusNoContent)
}
