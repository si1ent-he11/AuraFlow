package app

import domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"

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

func (as appService) GetRoleByUserId(dto domain.SpaceMemberDTO) (string, error) {
	return as.db.GetRoleByUserId(dto)
}

func (as appService) GetMembersFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error) {
	return as.db.GetAllMembersFromSpace(dto)
}

func (as appService) PromoteMember(dto domain.SpaceMemberDTO) error {
	return as.PromoteMember(dto)
}

func (as appService) DemoteMember(dto domain.SpaceMemberDTO) error {
	return as.db.DemoteMember(dto)
}

func (as appService) DeleteMember(dto domain.SpaceMemberDTO) error {
	return as.db.DeleteMember(dto)
}
