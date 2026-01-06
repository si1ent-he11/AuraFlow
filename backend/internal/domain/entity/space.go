package domain

import "time"

type Space struct {
	Id               int       `json:"id" binding:"required" db:"id"`
	SpaceName        string    `json:"spaceName,omitempty" binding:"required" db:"space_name"`
	SpaceDescription string    `json:"spaceDescription,omitempty" binding:"required" db:"space_description"`
	OwnerId          int       `json:"ownerId,omitempty" binding:"required" db:"owner_id"`
	CreatedAt        time.Time `json:"createdAt" binding:"required" db:"created_at"`
}

type SpaceResponseDTO struct {
	Id               int       `json:"id" db:"id"`
	SpaceName        string    `json:"spaceName,omitempty" db:"space_name"`
	SpaceDescription string    `json:"spaceDescription,omitempty" db:"space_description"`
	OwnerEmail       string    `json:"ownerEmail,omitempty" db:"email"`
	OwnerName        string    `json:"ownerName,omitempty" db:"username_in_space"`
	CreatedAt        time.Time `json:"createdAt" db:"created_at"`
}

type SpaceIdDTO struct {
	SpaceId int `json:"spaceId" db:"space_id"`
}

type CreateSpaceDTO struct {
	SpaceName        string  `json:"spaceName" binding:"required"`
	SpaceDescription *string `json:"spaceDescription"`
	UsernameInSpace  *string `json:"usernameInSpace"`
	OwnerId          int     `json:"ownerId"`
}

type SpaceNameDTO struct {
	SpaceName string `json:"spaceName" binding:"required"`
}

type SpaceDescriptionDTO struct {
	SpaceDescription string `json:"spaceDescription" binding:"required"`
}
