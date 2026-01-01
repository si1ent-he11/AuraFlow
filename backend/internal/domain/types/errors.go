package types

import "errors"

var (
	ErrMemberNotFound = errors.New("member not found in space")
	ErrUserNotFound   = errors.New("user not found")
	ErrUserExists     = errors.New("user already exists")
)
