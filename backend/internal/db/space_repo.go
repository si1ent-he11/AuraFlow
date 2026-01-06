package data

import (
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (db db) InsertSpace(dto domain.CreateSpaceDTO) (int, error) {
	var id int

	err := db.conn.Get(
		&id,
		`
			INSERT INTO spaces (space_name, space_description, owner_id)
        	VALUES ($1, $2, $3)
        	RETURNING id
		`,
		dto.SpaceName,
		dto.SpaceDescription,
		dto.OwnerId,
	)

	return id, err
}

func (db db) GetSpacesByUserId(userId int) ([]domain.Space, error) {
	spaces := make([]domain.Space, 0)
	if err := db.conn.Select(
		&spaces,
		`
			SELECT s.id, s.space_name, s.owner_id, s.created_at
			FROM space_members sm
			JOIN spaces s ON sm.space_id = s.id
			WHERE sm.user_id = $1
		`,
		userId,
	); err != nil {
		return []domain.Space{}, err
	}

	return spaces, nil
}

func (db db) GetSpaceById(id int) (domain.SpaceResponseDTO, error) {
	space := domain.SpaceResponseDTO{}
	if err := db.conn.Get(
		&space,
		`
			SELECT s.id, s.space_name, u.email, sm.username_in_space, s.space_description, s.created_at
			FROM spaces s
			JOIN users u ON u.id = s.owner_id
			JOIN space_members sm ON sm.user_id = s.owner_id
			WHERE s.id = $1
		`,
		id,
	); err != nil {
		return domain.SpaceResponseDTO{}, err
	}

	return space, nil
}

func (db db) DeleteSpaceById(spaceId int) error {
	res, err := db.conn.Exec(
		`
			DELETE FROM spaces WHERE id = $1
		`, spaceId,
	)
	if err != nil {
		return err
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}

	if rows == 0 {
		return types.ErrMemberNotFound
	}

	return nil
}

func (db db) ChangeSpaceName(spaceId int, newName string) error {
	_, err := db.conn.Exec(
		`
			UPDATE spaces 
			SET space_name = $1
			WHERE id = $2
		`,
		newName,
		spaceId,
	)

	return err
}

func (db db) ChangeSpaceDesc(spaceId int, newDesc string) error {
	_, err := db.conn.Exec(
		`
			UPDATE spaces 
			SET space_description = $1
			WHERE id = $2
		`,
		newDesc,
		spaceId,
	)

	return err
}
