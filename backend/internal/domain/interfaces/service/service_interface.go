package service

import domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"

type AppService interface {
	SignIn(userDTO domain.UserRequestDTO) (domain.TokenPair, error)
	SignUp(user domain.UserCreateDTO) error
	Refresh(refreshToken string) (domain.TokenPair, error)
	GetUserFromAccessToken(authHeader string) (domain.User, error)
	GetUserById(id int) (domain.User, error)
	UpdateUser(dto domain.UserUpdateDTO, userId int) error

	CreateSpace(createSpaceDTO domain.CreateSpaceDTO, owner domain.AddOwnerToSpaceRequestDTO) error
	GetSpacesByUserId(userId int) ([]domain.Space, error)
	GetSpaceById(id int) (domain.SpaceResponseDTO, error)
	LeaveSpace(dto domain.SpaceMemberDTO) error

	CreateInvite(createInviteDTO domain.CreateInviteDTO) (domain.InviteIdDTO, error)
	GetInvitesBySpaceId(dto domain.SpaceMemberDTO) ([]domain.Invite, error)
	DeleteInvite(dto domain.InviteIdDTO) error

	CreateSpaceMember(dto domain.CreateSpaceMemberByInviteDTO, userId int) error
	GetRoleByUserId(dto domain.SpaceMemberDTO) (string, error)
	GetMembersFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error)
	PromoteMember(dto domain.SpaceMemberDTO) error
	DemoteMember(dto domain.SpaceMemberDTO) error
	DeleteMember(dto domain.SpaceMemberDTO) error
}
