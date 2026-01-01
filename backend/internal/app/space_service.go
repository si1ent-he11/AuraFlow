package app

import (
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
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
	role, err := as.db.GetRoleByUserId(dto)
	if err != nil {
		return err
	}

	if role == "owner" {
		return as.db.DeleteSpaceById(dto.SpaceId)
	} else {
		return as.db.DeleteMember(dto)
	}
}
