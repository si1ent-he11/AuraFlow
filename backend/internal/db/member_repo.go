package data

import (
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (db db) IsOwner(dto domain.SpaceMemberDTO) (bool, error) {
	var exists bool

	err := db.conn.Get(
		&exists,
		`
        	SELECT EXISTS(
            	SELECT 1
            	FROM space_members
            	WHERE space_id = $1 AND user_id = $2 AND space_role = 'owner'
        	)
    	`,
		dto.SpaceId,
		dto.UserId,
	)
	return exists, err
}

func (db db) IsAdmin(dto domain.SpaceMemberDTO) (bool, error) {
	var exists bool

	err := db.conn.Get(
		&exists,
		`
        	SELECT EXISTS(
            	SELECT 1
            	FROM space_members
            	WHERE space_id = $1 AND user_id = $2 AND (space_role = 'owner' OR space_role = 'admin')
        	)
    	`,
		dto.SpaceId,
		dto.UserId,
	)
	return exists, err
}

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

func (db db) GetMemberByMemberId(memberId int, spaceId int) (domain.SpaceMember, error) {
	member := domain.SpaceMember{}

	err := db.conn.Get(
		&member,
		`
            SELECT user_id, username_in_space, space_role, joined_at
            FROM space_members
            WHERE id = $1 AND space_id = $2
    	`,
		memberId,
		spaceId,
	)
	if err != nil {
		return domain.SpaceMember{}, err
	}

	return member, nil
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

func (db db) GetAllAdminsFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error) {
	mambers := make([]domain.SpaceMember, 0)

	if err := db.conn.Select(
		&mambers,
		`
			SELECT user_id, username_in_space, space_role, joined_at 
			FROM space_members 
			WHERE space_id = $1 AND (space_role = 'admin' OR space_role = 'owner')
		`,
		dto.SpaceId,
	); err != nil {
		return []domain.SpaceMember{}, err
	}

	return mambers, nil
}

func (db db) GetAllMembersFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error) {
	mambers := make([]domain.SpaceMember, 0)

	if err := db.conn.Select(
		&mambers,
		`
			SELECT user_id, username_in_space, space_role, joined_at 
			FROM space_members 
			WHERE space_id = $1 AND space_role = 'member'
		`,
		dto.SpaceId,
	); err != nil {
		return []domain.SpaceMember{}, err
	}

	return mambers, nil
}

func (db db) GetMember(dto domain.SpaceMemberDTO) (domain.SpaceMember, error) {
	member := domain.SpaceMember{}

	if err := db.conn.Get(
		&member,
		`
			SELECT id, space_id, user_id, username_in_space, space_role, joined_at
			FROM space_members
			WHERE space_id = $1 AND user_id = $2
		`,
		dto.SpaceId,
		dto.UserId,
	); err != nil {
		return domain.SpaceMember{}, err
	}

	return member, nil
}

func (db db) UpdateMemberUsername(dto domain.UpdateSpaceMemberDTO) error {
	_, err := db.conn.Exec(
		`
			UPDATE space_members 
			SET username_in_space = $1
			WHERE space_id = $2 AND user_id = $3 
		`,
		dto.UserNameInSpace,
		dto.SpaceId,
		dto.UserId,
	)
	return err
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
