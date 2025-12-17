package data

import "github.com/si1ent-he11/AuraFlow/internal/core"

type Db interface {
	GetUserPasswordHashByEmail(email string) (string, error)
	GetUserByEmail(email string) (core.User, error)
	GetUserById(id int) (core.User, error)
	CreateUser(passwordHash string, user core.UserCreateDTO) error
}
