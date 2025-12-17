package auth

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
)

func generateToken(claims jwt.Claims, JWTkey string) (string, error) {
	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(JWTkey))
}

func parseToken[T jwt.Claims](tokenString string, claims T, JWTkey string) (T, error) {
	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (any, error) {
		if t.Method != jwt.SigningMethodHS256 {
			return "", fmt.Errorf("unexpect sign method")
		}
		return []byte(JWTkey), nil
	})
	if err != nil {
		return claims, err
	}

	if !token.Valid {
		return claims, fmt.Errorf("invalid token")
	}

	return claims, nil
}
