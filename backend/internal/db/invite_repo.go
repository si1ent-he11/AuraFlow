package data

import (
	"github.com/google/uuid"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
)

func (db db) InsertInviteToSpace(invite domain.Invite) error {
	_, err := db.conn.Exec(
		`
			INSERT INTO invites (id, space_id, expires_at, max_uses) 
			VALUES ($1, $2, $3, $4)
		`,
		invite.Id,
		invite.SpaceId,
		invite.ExpiresAt,
		invite.MaxUses,
	)
	return err
}

func (db db) UseInvite(inviteId uuid.UUID) (domain.SpaceIdDTO, error) {
	spaceId := domain.SpaceIdDTO{}

	if err := db.conn.Get(
		&spaceId,
		`
			UPDATE invites
			SET used_count = used_count + 1
			WHERE id = $1 AND expires_at > NOW() AND used_count < max_uses
			RETURNING space_id
		`,
		inviteId,
	); err != nil {
		return domain.SpaceIdDTO{}, err
	}

	return spaceId, nil
}

func (db db) GetInvite(spaceId int) ([]domain.Invite, error) {
	invite := []domain.Invite{}
	if err := db.conn.Select(
		&invite,
		`
			SELECT id, expires_at, max_uses, used_count, created_at 
			FROM invites
			WHERE space_id = $1
		`,
		spaceId,
	); err != nil {
		return []domain.Invite{}, err
	}
	return invite, nil
}

func (db db) GetInvitesBySpaceId(spaceId int) ([]domain.Invite, error) {
	invite := []domain.Invite{}
	if err := db.conn.Select(
		&invite,
		`
			SELECT id, expires_at, max_uses, used_count, created_at 
			FROM invites
			WHERE space_id = $1
		`,
		spaceId,
	); err != nil {
		return []domain.Invite{}, err
	}
	return invite, nil
}

func (db db) DeleteInvite(inviteId uuid.UUID) error {
	_, err := db.conn.Exec("DELETE FROM invites WHERE id = $1", inviteId)
	return err
}
