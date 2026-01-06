package app

import (
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (as appService) CreateSpaceMember(dto domain.CreateSpaceMemberByInviteDTO, userId int) error {
	spaceId, err := as.db.UseInvite(dto.InviteId)
	if err != nil {
		return err
	}

	exists, err := as.db.MemberExists(domain.SpaceMemberDTO{
		SpaceId: spaceId.SpaceId,
		UserId:  userId,
	})
	if err != nil {
		return err
	}

	if exists {
		return nil
	}

	return as.db.InsertSpaceMember(domain.CreateSpaceMemberDTO{
		SpaceId:         spaceId.SpaceId,
		UserId:          userId,
		UsernameInSpace: *dto.UsernameInSpace,
		Role:            "member",
	})
}

func (as appService) GetMemberByMemberId(memberId int, spaceId int) (domain.SpaceMember, error) {
	return as.db.GetMemberByMemberId(memberId, spaceId)
}

func (as appService) GetMember(dto domain.SpaceMemberDTO) (domain.SpaceMember, error) {
	return as.db.GetMember(dto)
}

func (as appService) MemberExists(dto domain.SpaceMemberDTO) (bool, error) {
	return as.db.MemberExists(dto)
}

func (as appService) UpdateMemberUsername(dto domain.UpdateSpaceMemberDTO) error {
	return as.db.UpdateMemberUsername(dto)
}

func (as appService) GetAllAdminsFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error) {
	return as.db.GetAllAdminsFromSpace(dto)
}

func (as appService) GetMembersFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error) {
	return as.db.GetAllMembersFromSpace(dto)
}

func (as appService) PromoteMember(dto domain.SpaceMemberDTO, ownerId int) error {
	isOwner, err := as.db.IsOwner(domain.SpaceMemberDTO{
		SpaceId: dto.SpaceId,
		UserId:  ownerId,
	})
	if err != nil {
		return err
	}

	if !isOwner {
		return types.ErrorForbidden
	}

	return as.db.PromoteMember(dto)
}

func (as appService) DemoteMember(dto domain.SpaceMemberDTO, ownerId int) error {
	isOwner, err := as.db.IsOwner(domain.SpaceMemberDTO{
		SpaceId: dto.SpaceId,
		UserId:  ownerId,
	})
	if err != nil {
		return err
	}

	if !isOwner {
		return types.ErrorForbidden
	}

	return as.db.DemoteMember(dto)
}

func (as appService) DeleteMember(dto domain.SpaceMemberDTO, ownerId int) error {
	isOwner, err := as.db.IsOwner(domain.SpaceMemberDTO{
		SpaceId: dto.SpaceId,
		UserId:  ownerId,
	})
	if err != nil {
		return err
	}

	if !isOwner {
		return types.ErrorForbidden
	}

	return as.db.DeleteMember(dto)
}
