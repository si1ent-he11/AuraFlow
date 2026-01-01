package app

import (
	"github.com/si1ent-he11/AuraFlow/internal/domain/interfaces/repository"
	"github.com/si1ent-he11/AuraFlow/pkg/auth"
)

type appService struct {
	db   repository.DatabaseRepository
	auth auth.AuthService
}

func NewService(db repository.DatabaseRepository, auth auth.AuthService) appService {
	return appService{db: db, auth: auth}
}
