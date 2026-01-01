package domain

import (
	"time"

	"github.com/google/uuid"
)

type Invite struct {
	Id        uuid.UUID `json:"id" db:"id"`
	SpaceId   int       `json:"spaceId,omitempty" db:"space_id"`
	ExpiresAt time.Time `json:"expiresAt" db:"expires_at"`
	MaxUses   int       `json:"maxUses" db:"max_uses"`
	UsedCount int       `json:"usedCount" db:"used_count"`
	CreatedAt time.Time `json:"createdAt" db:"created_at"`
}

type CreateInviteDTO struct {
	SpaceId       int `json:"spaceId"`
	HoursToExpire int `json:"hoursToExpire"`
	MaxUses       int `json:"maxUses"`
}

type InviteIdDTO struct {
	InviteId uuid.UUID `json:"inviteId"`
}
