package domain

import (
	"time"

	"github.com/google/uuid"
)

type SpaceMember struct {
	Id              int       `json:"id,omitempty" db:"id"`
	SpaceId         int       `json:"spaceId,omitempty" db:"space_id"`
	UserId          int       `json:"userId" db:"user_id"`
	UsernameInSpace string    `json:"usernameInSpace" db:"username_in_space"`
	SpaceRole       string    `json:"spaceRole" db:"space_role"`
	JoinedAt        time.Time `json:"joinedAt" db:"joined_at"`
}

type CreateSpaceMemberByInviteDTO struct {
	InviteId        uuid.UUID `json:"inviteId" binding:"required"`
	UsernameInSpace *string   `json:"usernameInSpace"`
}

type CreateSpaceMemberDTO struct {
	SpaceId         int    `json:"spaceId"`
	UserId          int    `json:"userId"`
	UsernameInSpace string `json:"usernameInSpace" binding:"min=6,max=40"`
	Role            string `json:"role"`
}

type SpaceMemberDTO struct {
	SpaceId int `json:"spaceId"`
	UserId  int `json:"userId"`
}
