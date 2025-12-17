package app

import "github.com/si1ent-he11/AuraFlow/internal/core"

type AppService interface {
	SignIn(userDTO core.UserRequestDTO) (core.TokenPair, error)
	SignUp(user core.UserCreateDTO) error
	Refresh(refreshToken string) (core.TokenPair, error)
	GetUserFromAccessToken(authHeader string) (core.User, error)
}
