package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
)

func (r router) signUp(ctx *gin.Context) {
	userDTO := domain.UserCreateDTO{}
	if err := ctx.ShouldBindJSON(&userDTO); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	if err := r.service.SignUp(userDTO); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusCreated, map[string]string{
		"username": userDTO.Username,
		"email":    userDTO.Email,
	})
}

func (r router) signIn(ctx *gin.Context) {
	userDTO := domain.UserRequestDTO{}
	if err := ctx.ShouldBindJSON(&userDTO); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	tokens, err := r.service.SignIn(userDTO)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:     "refresh",
		Value:    tokens.RefreshToken,
		Path:     "/",
		MaxAge:   7 * 24 * 60 * 60,
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	})
	ctx.JSON(http.StatusOK, map[string]string{
		"accessToken": tokens.AccessToken,
	})
}

func (r router) refresh(ctx *gin.Context) {
	refresh, err := ctx.Cookie("refresh")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	tokens, err := r.service.Refresh(refresh)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": err.Error(),
		})
		return
	}

	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:     "refresh",
		Value:    tokens.RefreshToken,
		Path:     "/",
		MaxAge:   7 * 24 * 60 * 60,
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	})
	ctx.JSON(http.StatusOK, map[string]string{
		"accessToken": tokens.AccessToken,
	})
}

func (r router) logout(ctx *gin.Context) {
	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:     "refresh",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	})
	ctx.Status(http.StatusOK)
}
