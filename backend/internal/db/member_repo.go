package data

import (
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (db db) MemberExists(dto domain.SpaceMemberDTO) (bool, error) {
	var exists bool

	err := db.conn.Get(
		&exists,
		`
        	SELECT EXISTS(
            	SELECT 1
            	FROM space_members
            	WHERE space_id = $1 AND user_id = $2
        	)
    	`,
		dto.SpaceId,
		dto.UserId,
	)
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (db db) InsertSpaceMember(dto domain.CreateSpaceMemberDTO) error {
	_, err := db.conn.Exec(
		`
			INSERT INTO space_members (space_id, user_id, username_in_space, space_role)
			VALUES ($1, $2, $3, $4)
		`,
		dto.SpaceId,
		dto.UserId,
		dto.UsernameInSpace,
		dto.Role,
	)
	return err
}

func (db db) GetAllMembersFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error) {
	mambers := make([]domain.SpaceMember, 0)

	if err := db.conn.Select(
		&mambers,
		`
			SELECT user_id, username_in_space, space_role, joined_at 
			FROM space_members 
			WHERE space_id = $1
		`,
		dto.SpaceId,
	); err != nil {
		return []domain.SpaceMember{}, err
	}

	return mambers, nil
}

func (db db) GetRoleByUserId(dto domain.SpaceMemberDTO) (string, error) {
	role := ""

	if err := db.conn.Get(
		&role,
		`
			SELECT space_role 
			FROM space_members
			WHERE space_id = $1 AND user_id = $2
		`,
		dto.SpaceId,
		dto.UserId,
	); err != nil {
		return "", err
	}

	return role, nil
}

func (db db) PromoteMember(dto domain.SpaceMemberDTO) error {
	res, err := db.conn.Exec(
		`
			UPDATE space_members
			SET space_role = 'admin'
			WHERE space_id = $1 AND user_id = $2
		`,
		dto.SpaceId,
		dto.UserId,
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

	return err
}

func (db db) DemoteMember(dto domain.SpaceMemberDTO) error {
	res, err := db.conn.Exec(
		`
			UPDATE space_members
			SET space_role = 'member'
			WHERE space_id = $1 AND user_id = $2
		`,
		dto.SpaceId,
		dto.UserId,
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

func (db db) DeleteMember(dto domain.SpaceMemberDTO) error {
	res, err := db.conn.Exec(
		`
			DELETE
			FROM space_members
			WHERE space_id = $1 AND user_id = $2
		`,
		dto.SpaceId,
		dto.UserId,
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
