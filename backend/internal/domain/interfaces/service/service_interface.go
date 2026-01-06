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
	ChangeSpaceName(spaceMember domain.SpaceMemberDTO, newName string) error
	ChangeSpaceDesc(spaceMember domain.SpaceMemberDTO, newDesc string) error
	LeaveSpace(dto domain.SpaceMemberDTO) error

	CreateInvite(createInviteDTO domain.CreateInviteDTO) (domain.InviteIdDTO, error)
	GetInvitesBySpaceId(dto domain.SpaceMemberDTO) ([]domain.Invite, error)
	DeleteInvite(dto domain.InviteIdDTO) error

	CreateSpaceMember(dto domain.CreateSpaceMemberByInviteDTO, userId int) error
	GetMember(dto domain.SpaceMemberDTO) (domain.SpaceMember, error)
	GetMemberByMemberId(memberId int, spaceId int) (domain.SpaceMember, error)
	GetMembersFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error)
	GetAllAdminsFromSpace(dto domain.SpaceIdDTO) ([]domain.SpaceMember, error)
	UpdateMemberUsername(dto domain.UpdateSpaceMemberDTO) error
	MemberExists(dto domain.SpaceMemberDTO) (bool, error)
	PromoteMember(dto domain.SpaceMemberDTO, ownerId int) error
	DemoteMember(dto domain.SpaceMemberDTO, ownerId int) error
	DeleteMember(dto domain.SpaceMemberDTO, ownerId int) error

	SetupNewTaskGroup(tg domain.CreateTaskGroupDTO, spaceMember domain.SpaceMemberDTO) error
	GetTaskGroupById(id int) (domain.TaskGroup, error)
	GetTasksGroupsBySpaceId(id int) ([]domain.TaskGroup, error)

	GetGroupTasks(groupID int) ([]domain.Task, error)
	AddTaskToGroup(t domain.CreateTaskDTO, taskGroupId int) error

	GetMemberHistory(memberID int, groupID int) ([]domain.Grade, error)
	SetMemberGrade(g domain.Grade) error
}
