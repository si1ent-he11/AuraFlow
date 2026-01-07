package app

import (
	"errors"
	"fmt"

	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
)

func (as appService) SetupNewTaskGroup(tg domain.CreateTaskGroupDTO, spaceMember domain.SpaceMemberDTO) error {
	if tg.MinScore >= tg.MaxScore {
		return errors.New("score error min score >= max score ")
	}

	member, err := as.GetMember(spaceMember)
	if err != nil {
		return err
	}

	return as.db.CreateTaskGroup(domain.TaskGroup{
		SpaceID:       member.SpaceId,
		CreatedBy:     member.Id,
		TaskGroupName: tg.TaskGroupName,
		MaxScore:      tg.MaxScore,
		MinScore:      tg.MinScore,
	})
}

func (as appService) GetTasksGroupsBySpaceId(id int) ([]domain.TaskGroup, error) {
	return as.db.GetTasksGroupsBySpaceId(id)
}

func (as appService) GetTaskGroupById(id int) (domain.TaskGroup, error) {
	return as.db.GetTaskGroupById(id)
}

func (as appService) AddTaskToGroup(task domain.CreateTaskDTO, taskGroupId int) error {
	if task.Title == "" {
		return errors.New("title is empty")
	}

	_, err := as.db.GetTaskGroupById(taskGroupId)
	if err != nil {
		return fmt.Errorf("task group not found: %w", err)
	}

	return as.db.CreateTask(task, taskGroupId)
}

func (as appService) GetGroupTasks(groupID int) ([]domain.Task, error) {
	return as.db.GetTasksByGroup(groupID)
}

func (as appService) GetExpiresTasksFromSpace(spaceId string) ([]domain.TaskIntroDTO, error) {
	return as.db.GetExpiresTasksFromSpace(spaceId)
}

func (as appService) SetMemberGrade(g domain.Grade) error {
	group, err := as.db.GetTaskGroupById(g.TaskGroupID)
	if err != nil {
		return err
	}

	if g.Score < group.MinScore || g.Score > group.MaxScore {
		return fmt.Errorf("range error min score %d max score %d", group.MinScore, group.MaxScore)
	}

	return as.db.InsertGrade(g)
}

func (as appService) UpdateTaskGroup(taskGroupId int, tg domain.TaskGroupUpdateTitleDTO) error {
	return as.db.UpdateTaskGroup(taskGroupId, tg)
}

func (as appService) GetMemberHistory(memberID int, groupID int) ([]domain.Grade, error) {
	return as.db.GetGradesByMember(memberID, groupID)
}

func (as appService) DeleteTask(taskID int) error {
	return as.db.DeleteTask(taskID)
}

func (as appService) DeleteTaskGroup(groupID int) error {
	return as.db.DeleteTaskGroup(groupID)
}
