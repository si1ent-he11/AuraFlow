package repository

import (
	"github.com/google/uuid"
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
)

type DatabaseRepository interface {
	GetUserPasswordHashByEmail(email string) (string, error)
	GetUserByEmail(email string) (domain.User, error)
	GetUserById(id int) (domain.User, error)
	UpdateUser(dto domain.UserUpdateDTO, userId int) error
	InsertUser(passwordHash string, user domain.UserCreateDTO) error
	UserExists(userId int) (bool, error)
	UserExistsByEmail(email string) (bool, error)

	InsertSpace(space domain.CreateSpaceDTO) (int, error)
	GetSpacesByUserId(userId int) ([]domain.Space, error)
	GetSpaceById(id int) (domain.SpaceResponseDTO, error)
	DeleteSpaceById(spaceId int) error

	InsertInviteToSpace(invite domain.Invite) error
	UseInvite(inviteId uuid.UUID) (domain.SpaceIdDTO, error)
	GetInvitesBySpaceId(spaceId int) ([]domain.Invite, error)
	DeleteInvite(inviteId uuid.UUID) error

	MemberExists(dto domain.SpaceMemberDTO) (bool, error)
	GetRoleByUserId(dto domain.SpaceMemberDTO) (string, error)
	InsertSpaceMember(spaceMember domain.CreateSpaceMemberDTO) error
	GetAllMembersFromSpace(spaceIdDTO domain.SpaceIdDTO) ([]domain.SpaceMember, error)
	PromoteMember(dto domain.SpaceMemberDTO) error
	DemoteMember(dto domain.SpaceMemberDTO) error
	DeleteMember(dto domain.SpaceMemberDTO) error
}
