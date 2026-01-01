package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
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

func (as authService) GenerateAccessToken(user domain.User) (string, error) {
	access := domain.AccessClaims{
		Id:       user.Id,
		Email:    user.Email,
		Username: user.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(5 * time.Hour)),
		},
	}

	return generateToken(access, as.accessKey)
}

func (as authService) GenerateRefreshToken(id int) (string, error) {
	refresh := domain.RefreshClaims{
		Id: id,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 7 * 24)),
		},
	}
	return generateToken(refresh, as.refreshKey)
}

func (as authService) ParseAccessToken(accessToken string) (domain.User, error) {
	accessClaims, err := parseToken(accessToken, &domain.AccessClaims{}, as.accessKey)
	return domain.User{
		Id:       accessClaims.Id,
		Email:    accessClaims.Email,
		Username: accessClaims.Username,
	}, err
}

func (as authService) ParseRefreshToken(refreshToken string) (domain.User, error) {
	refreshClaims, err := parseToken(refreshToken, &domain.RefreshClaims{}, as.refreshKey)
	return domain.User{
		Id: refreshClaims.Id,
	}, err
}
