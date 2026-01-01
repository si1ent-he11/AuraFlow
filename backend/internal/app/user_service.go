package app

import (
	"errors"
	"strings"

	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (as appService) GetUserFromAccessToken(authHeader string) (domain.User, error) {
	tokenParts := strings.Split(authHeader, " ")
	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		return domain.User{}, errors.New("invalid Authorization header format")
	}

	return as.auth.ParseAccessToken(tokenParts[1])
}

func (as appService) GetUserById(id int) (domain.User, error) {
	return as.db.GetUserById(id)
}

func (as appService) UpdateUser(dto domain.UserUpdateDTO, userId int) error {
	existingUser, err := as.db.GetUserById(userId)
	if err != nil {
		return err
	}

	if dto.Email != nil && *dto.Email != existingUser.Email {
		isEmailTaken, err := as.db.UserExistsByEmail(*dto.Email)
		if err != nil {
			return err
		}
		if isEmailTaken {
			return types.ErrUserExists
		}
	}

	return as.db.UpdateUser(dto, userId)
}
