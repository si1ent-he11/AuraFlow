package app

import (
	"fmt"

	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/pkg/hash"
)

func (s appService) SignIn(userDTO domain.UserRequestDTO) (domain.TokenPair, error) {
	passwordHash, err := s.db.GetUserPasswordHashByEmail(userDTO.Email)
	if err != nil {
		return domain.TokenPair{}, err
	}

	if !hash.CheckPasswordHash(userDTO.Password, passwordHash) {
		return domain.TokenPair{}, fmt.Errorf("incorrect password")
	}

	user, err := s.db.GetUserByEmail(userDTO.Email)
	if err != nil {
		return domain.TokenPair{}, err
	}

	refreshToken, err := s.auth.GenerateRefreshToken(user.Id)
	if err != nil {
		return domain.TokenPair{}, err
	}

	accessToken, err := s.auth.GenerateAccessToken(user)
	if err != nil {
		return domain.TokenPair{}, err
	}

	return domain.TokenPair{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (s appService) SignUp(user domain.UserCreateDTO) error {
	passwordHash, err := hash.HashPassword(user.Password)
	if err != nil {
		return err
	}

	return s.db.InsertUser(passwordHash, user)
}

func (s appService) Refresh(refreshToken string) (domain.TokenPair, error) {
	userDTO, err := s.auth.ParseRefreshToken(refreshToken)
	if err != nil {
		return domain.TokenPair{}, err
	}

	user, err := s.db.GetUserById(userDTO.Id)
	if err != nil {
		return domain.TokenPair{}, err
	}

	newAccessToken, err := s.auth.GenerateAccessToken(user)
	if err != nil {
		return domain.TokenPair{}, err
	}

	newRefrshToken, err := s.auth.GenerateRefreshToken(user.Id)
	if err != nil {
		return domain.TokenPair{}, err
	}

	return domain.TokenPair{
		AccessToken:  newAccessToken,
		RefreshToken: newRefrshToken,
	}, nil
}
