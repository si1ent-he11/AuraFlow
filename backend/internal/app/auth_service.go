package app

import (
	"fmt"

	"github.com/si1ent-he11/AuraFlow/internal/core"
	"github.com/si1ent-he11/AuraFlow/pkg/hash"
)

func (s appService) SignIn(userDTO core.UserRequestDTO) (core.TokenPair, error) {
	passwordHash, err := s.db.GetUserPasswordHashByEmail(userDTO.Email)
	if err != nil {
		return core.TokenPair{}, err
	}

	if !hash.CheckPasswordHash(userDTO.Password, passwordHash) {
		return core.TokenPair{}, fmt.Errorf("incorrect password")
	}

	user, err := s.db.GetUserByEmail(userDTO.Email)
	if err != nil {
		return core.TokenPair{}, err
	}

	refreshToken, err := s.auth.GenerateRefreshToken(user.Id)
	if err != nil {
		return core.TokenPair{}, err
	}

	accessToken, err := s.auth.GenerateAccessToken(user)
	if err != nil {
		return core.TokenPair{}, err
	}

	return core.TokenPair{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (s appService) SignUp(user core.UserCreateDTO) error {
	passwordHash, err := hash.HashPassword(user.Password)
	if err != nil {
		return err
	}

	return s.db.CreateUser(passwordHash, user)
}

func (s appService) Refresh(refreshToken string) (core.TokenPair, error) {
	userDTO, err := s.auth.ParseRefreshToken(refreshToken)
	if err != nil {
		return core.TokenPair{}, err
	}

	user, err := s.db.GetUserById(userDTO.Id)
	if err != nil {
		return core.TokenPair{}, err
	}

	newAccessToken, err := s.auth.GenerateAccessToken(user)
	if err != nil {
		return core.TokenPair{}, err
	}

	newRefrshToken, err := s.auth.GenerateRefreshToken(user.Id)
	if err != nil {
		return core.TokenPair{}, err
	}

	return core.TokenPair{
		AccessToken:  newAccessToken,
		RefreshToken: newRefrshToken,
	}, nil
}
