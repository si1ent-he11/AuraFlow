package auth

import (
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
)

type AuthService interface {
	GenerateAccessToken(user domain.User) (string, error)
	GenerateRefreshToken(id int) (string, error)
	ParseAccessToken(accessToken string) (domain.User, error)
	ParseRefreshToken(refreshToken string) (domain.User, error)
}
