package app

import (
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
	"github.com/si1ent-he11/AuraFlow/internal/domain/types"
)

func (as appService) CreateSpace(dto domain.CreateSpaceDTO, owner domain.AddOwnerToSpaceRequestDTO) error {
	dto.OwnerId = owner.UserId
	id, err := as.db.InsertSpace(dto)
	if err != nil {
		return err
	}

	if err := as.db.InsertSpaceMember(domain.CreateSpaceMemberDTO{
		SpaceId:         id,
		UserId:          owner.UserId,
		UsernameInSpace: owner.UsernameInSpace,
		Role:            "owner",
	}); err != nil {
		return err
	}

	return nil
}

func (as appService) GetSpacesByUserId(userId int) ([]domain.Space, error) {
	return as.db.GetSpacesByUserId(userId)
}

func (as appService) GetSpaceById(id int) (domain.SpaceResponseDTO, error) {
	return as.db.GetSpaceById(id)
}

func (as appService) LeaveSpace(dto domain.SpaceMemberDTO) error {
	mamber, err := as.db.GetMember(dto)
	if err != nil {
		return err
	}

	if mamber.SpaceRole == "owner" {
		return as.db.DeleteSpaceById(dto.SpaceId)
	} else {
		return as.db.DeleteMember(dto)
	}
}

func (as appService) ChangeSpaceName(spaceMember domain.SpaceMemberDTO, newName string) error {
	isOwner, err := as.db.IsOwner(spaceMember)
	if err != nil {
		return err
	}

	if !isOwner {
		return types.ErrorForbidden
	}

	return as.db.ChangeSpaceName(spaceMember.SpaceId, newName)
}

func (as appService) ChangeSpaceDesc(spaceMember domain.SpaceMemberDTO, newDesc string) error {
	isOwner, err := as.db.IsOwner(spaceMember)
	if err != nil {
		return err
	}

	if !isOwner {
		return types.ErrorForbidden
	}

	return as.db.ChangeSpaceDesc(spaceMember.SpaceId, newDesc)

}
