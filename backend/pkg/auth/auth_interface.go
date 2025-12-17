package auth

import "github.com/si1ent-he11/AuraFlow/internal/core"

type AuthService interface {
	GenerateAccessToken(user core.User) (string, error)
	GenerateRefreshToken(id int) (string, error)
	ParseAccessToken(accessToken string) (core.User, error)
	ParseRefreshToken(refreshToken string) (core.User, error)
}
