package core

type User struct {
	Id       int    `json:"id"`
	Email    string `json:"email" binding:"required,email"`
	Username string `json:"username" binding:"required,min=6,max=40"`
}

type UserRequestDTO struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8,max=40"`
}

type UserCreateDTO struct {
	Email    string `json:"email" binding:"required,email"`
	Username string `json:"username" binding:"required,min=6,max=40"`
	Password string `json:"password" binding:"required,min=8,max=40"`
}
