package data

import (
	"github.com/si1ent-he11/AuraFlow/internal/core"
)

func (db db) GetUserPasswordHashByEmail(email string) (string, error) {
	var passwordHash string
	err := db.conn.Get(
		&passwordHash,
		`SELECT password_hash 
		FROM users 
		WHERE email=$1`,
		email,
	)
	return passwordHash, err
}

func (db db) GetUserByEmail(email string) (core.User, error) {
	user := core.User{}
	if err := db.conn.Get(
		&user,
		`SELECT id, email, username 
		FROM users 
		WHERE email=$1`,
		email,
	); err != nil {
		return core.User{}, err
	}

	return user, nil
}

func (db db) GetUserById(id int) (core.User, error) {
	user := core.User{}
	if err := db.conn.Get(
		&user,
		`SELECT id, email, username 
		FROM users 
		WHERE id=$1`,
		id,
	); err != nil {
		return core.User{}, err
	}

	return user, nil
}

func (db db) CreateUser(passwordHash string, userDTO core.UserCreateDTO) error {
	_, err := db.conn.Exec(
		`INSERT INTO users (email, username, password_hash)
		VALUES ($1, $2, $3)`,
		userDTO.Email,
		userDTO.Username,
		passwordHash,
	)

	return err
}
