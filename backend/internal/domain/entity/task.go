package domain

import "time"

type TaskGroup struct {
	ID            int    `json:"id" db:"id"`
	SpaceID       int    `json:"space_id" db:"space_id"`
	CreatedBy     int    `json:"created_by" db:"created_by"`
	TaskGroupName string `json:"task_group_name" db:"task_group_name" binding:"max=100"`
	MinScore      int    `json:"min_score" db:"min_score"`
	MaxScore      int    `json:"max_score" db:"max_score"`
}

type CreateTaskGroupDTO struct {
	TaskGroupName string `json:"task_group_name" db:"task_group_name" binding:"max=100"`
	MinScore      int    `json:"min_score" db:"min_score"`
	MaxScore      int    `json:"max_score" db:"max_score"`
}

type Task struct {
	ID          int        `json:"id" db:"id"`
	TaskGroupID int        `json:"task_group_id" db:"task_group_id"`
	Title       string     `json:"title" db:"title" binding:"max=200"`
	Description *string    `json:"description" db:"task_description"`
	IsCompleted bool       `json:"is_completed" db:"is_completed"`
	ExpiresAt   *time.Time `json:"expires_at" db:"expires_at"`
	CreatedAt   time.Time  `json:"created_at" db:"created_at"`
}

type CreateTaskDTO struct {
	Title       string     `json:"title" db:"title" binding:"max=200"`
	Description *string    `json:"description" db:"task_description"`
	ExpiresAt   *time.Time `json:"expires_at" db:"expires_at"`
}

type Grade struct {
	ID          int       `json:"id" db:"id"`
	MemberID    int       `json:"member_id" db:"member_id"`
	TaskGroupID int       `json:"task_group_id" db:"task_group_id"`
	Score       int       `json:"score" db:"score"`
	GradeDate   time.Time `json:"grade_date" db:"grade_date"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}
