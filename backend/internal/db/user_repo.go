package data

import domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"

func (db db) GetUserPasswordHashByEmail(email string) (string, error) {
	var passwordHash string
	err := db.conn.Get(
		&passwordHash,
		`
			SELECT password_hash 
			FROM users 
			WHERE email=$1
		`,
		email,
	)
	return passwordHash, err
}

func (db db) GetUserByEmail(email string) (domain.User, error) {
	user := domain.User{}
	if err := db.conn.Get(
		&user,
		`
			SELECT id, email, username 
			FROM users 
			WHERE email=$1
		`,
		email,
	); err != nil {
		return domain.User{}, err
	}

	return user, nil
}

func (db db) UserExistsByEmail(email string) (bool, error) {
	var exists bool

	err := db.conn.Get(
		&exists,
		`
        	SELECT EXISTS(
            	SELECT 1
            	FROM users
            	WHERE email = $1
        	)
    	`,
		email,
	)
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (db db) GetUserById(id int) (domain.User, error) {
	user := domain.User{}
	if err := db.conn.Get(
		&user,
		`
			SELECT id, email, username
			FROM users 
			WHERE id=$1
		`,
		id,
	); err != nil {
		return domain.User{}, err
	}

	return user, nil
}

func (db db) InsertUser(passwordHash string, userDTO domain.UserCreateDTO) error {
	_, err := db.conn.Exec(
		`
			INSERT INTO users (email, username, password_hash)
			VALUES ($1, $2, $3)
		`,
		userDTO.Email,
		userDTO.Username,
		passwordHash,
	)

	return err
}

func (db db) UserExists(userId int) (bool, error) {
	var exists bool

	err := db.conn.Get(
		&exists,
		`
        	SELECT EXISTS(
            	SELECT 1
            	FROM users
            	WHERE id = $1
        	)
    	`,
		userId,
	)
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (db db) UpdateUser(dto domain.UserUpdateDTO, userId int) error {
	var err error
	if dto.Username != nil {
		_, err = db.conn.Exec("UPDATE users SET username = $1 WHERE id = $2", dto.Username, userId)
	}

	if dto.Email != nil {
		_, err = db.conn.Exec("UPDATE users SET email = $1 WHERE id = $2", dto.Email, userId)
	}

	return err
}
