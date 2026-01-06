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
	ChangeSpaceName(spaceId int, newName string) error
	ChangeSpaceDesc(spaceId int, newDesc string) error
	DeleteSpaceById(spaceId int) error

	InsertInviteToSpace(invite domain.Invite) error
	UseInvite(inviteId uuid.UUID) (domain.SpaceIdDTO, error)
	GetInvitesBySpaceId(spaceId int) ([]domain.Invite, error)
	DeleteInvite(inviteId uuid.UUID) error

	MemberExists(dto domain.SpaceMemberDTO) (bool, error)
	GetMember(dto domain.SpaceMemberDTO) (domain.SpaceMember, error)
	GetMemberByMemberId(memberId int, spaceId int) (domain.SpaceMember, error)
	InsertSpaceMember(spaceMember domain.CreateSpaceMemberDTO) error
	GetAllMembersFromSpace(spaceIdDTO domain.SpaceIdDTO) ([]domain.SpaceMember, error)
	GetAllAdminsFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error)
	UpdateMemberUsername(dto domain.UpdateSpaceMemberDTO) error
	IsOwner(dto domain.SpaceMemberDTO) (bool, error)
	PromoteMember(dto domain.SpaceMemberDTO) error
	DemoteMember(dto domain.SpaceMemberDTO) error
	DeleteMember(dto domain.SpaceMemberDTO) error

	CreateTaskGroup(tg domain.TaskGroup) error
	UpdateTaskGroup(tg domain.TaskGroup) error
	GetTaskGroupById(id int) (domain.TaskGroup, error)
	GetTasksGroupsBySpaceId(id int) ([]domain.TaskGroup, error)

	CreateTask(t domain.CreateTaskDTO, taskGroupId int) error
	GetTasksByGroup(groupID int) ([]domain.Task, error)
	DeleteTask(id int) error

	InsertGrade(g domain.Grade) error
	GetGradesByMember(memberID int, groupID int) ([]domain.Grade, error)
}
