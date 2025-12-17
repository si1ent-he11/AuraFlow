package app

import (
	"errors"
	"strings"

	"github.com/si1ent-he11/AuraFlow/internal/core"
)

func (as appService) GetUserFromAccessToken(authHeader string) (core.User, error) {
	tokenParts := strings.Split(authHeader, " ")
	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		return core.User{}, errors.New("invalid Authorization header format")
	}

	return as.auth.ParseAccessToken(tokenParts[1])
}
