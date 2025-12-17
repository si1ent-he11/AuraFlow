package app

import (
	"github.com/si1ent-he11/AuraFlow/internal/data"
	"github.com/si1ent-he11/AuraFlow/pkg/auth"
)

type appService struct {
	db   data.Db
	auth auth.AuthService
}

func NewService(db data.Db, auth auth.AuthService) appService {
	return appService{db: db, auth: auth}
}
