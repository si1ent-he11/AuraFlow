package app

import (
	"time"

	"github.com/google/uuid"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (as appService) CreateInvite(dto domain.CreateInviteDTO) (domain.InviteIdDTO, error) {
	id := uuid.New()

	if dto.MaxUses <= 0 {
		dto.MaxUses = 1
	}

	if err := as.db.InsertInviteToSpace(domain.Invite{
		Id:        id,
		SpaceId:   dto.SpaceId,
		ExpiresAt: time.Now().Add(time.Duration(dto.HoursToExpire) * time.Hour),
		MaxUses:   dto.MaxUses,
	}); err != nil {
		return domain.InviteIdDTO{}, err
	}

	return domain.InviteIdDTO{
		InviteId: id,
	}, nil
}

func (as appService) GetInvitesBySpaceId(dto domain.SpaceMemberDTO) ([]domain.Invite, error) {
	isExists, err := as.db.MemberExists(dto)
	if err != nil {
		return []domain.Invite{}, err
	}

	if !isExists {
		return []domain.Invite{}, types.ErrMemberNotFound
	}

	return as.db.GetInvitesBySpaceId(dto.SpaceId)
}

func (as appService) DeleteInvite(dto domain.InviteIdDTO) error {
	return as.db.DeleteInvite(dto.InviteId)
}
