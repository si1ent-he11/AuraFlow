package domain

import "github.com/golang-jwt/jwt/v5"

type TokenPair struct {
	AccessToken  string
	RefreshToken string
}

type RefreshClaims struct {
	Id int `json:"id" binding:"required"`
	jwt.RegisteredClaims
}

type AccessClaims struct {
	Id       int    `json:"id" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Username string `json:"username" binding:"required,min=6,max=40"`
	jwt.RegisteredClaims
}
