package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/si1ent-he11/AuraFlow/internal/core"
)

type authService struct {
	accessKey  string
	refreshKey string
}

func NewAuthService(accessKey string, refreshKey string) authService {
	return authService{
		accessKey:  accessKey,
		refreshKey: refreshKey,
	}
}

func (as authService) GenerateAccessToken(user core.User) (string, error) {
	access := core.AccessClaims{
		Id:       user.Id,
		Email:    user.Email,
		Username: user.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(5 * time.Minute)),
		},
	}

	return generateToken(access, as.accessKey)
}

func (as authService) GenerateRefreshToken(id int) (string, error) {
	refresh := core.RefreshClaims{
		Id: id,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 7 * 24)),
		},
	}
	return generateToken(refresh, as.refreshKey)
}

func (as authService) ParseAccessToken(accessToken string) (core.User, error) {
	accessClaims, err := parseToken(accessToken, &core.AccessClaims{}, as.accessKey)
	return core.User{
		Id:       accessClaims.Id,
		Email:    accessClaims.Email,
		Username: accessClaims.Username,
	}, err
}

func (as authService) ParseRefreshToken(refreshToken string) (core.User, error) {
	refreshClaims, err := parseToken(refreshToken, &core.RefreshClaims{}, as.refreshKey)
	return core.User{
		Id: refreshClaims.Id,
	}, err
}
