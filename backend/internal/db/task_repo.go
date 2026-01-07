package data

import (
	domain "github.com/si1ent-he11/AuraFlow/internal/domain/entity"
)

func (d db) CreateTaskGroup(tg domain.TaskGroup) error {
	_, err := d.conn.Exec(
		`
			INSERT INTO task_groups (space_id, created_by, task_group_name, min_score, max_score)
			VALUES ($1, $2, $3, $4, $5)
		`,
		tg.SpaceID,
		tg.CreatedBy,
		tg.TaskGroupName,
		tg.MinScore,
		tg.MaxScore,
	)
	return err
}

func (d db) GetTasksGroupsBySpaceId(id int) ([]domain.TaskGroup, error) {
	tg := []domain.TaskGroup{}
	err := d.conn.Select(&tg, "SELECT * FROM task_groups WHERE space_id = $1", id)
	return tg, err
}

func (d db) GetTaskGroupById(id int) (domain.TaskGroup, error) {
	tg := domain.TaskGroup{}
	err := d.conn.Get(&tg, "SELECT * FROM task_groups WHERE id = $1", id)
	return tg, err
}

func (d db) UpdateTaskGroup(taskGroupId int, tg domain.TaskGroupUpdateTitleDTO) error {
	_, err := d.conn.Exec(
		`
			UPDATE task_groups 
			SET task_group_name = $1 
			WHERE id = $2
		`,
		tg.TaskGroupName,
		taskGroupId,
	)
	return err
}

func (d db) CreateTask(t domain.CreateTaskDTO, taskGroupId int) error {
	_, err := d.conn.Exec(
		`
			INSERT INTO tasks (task_group_id, title, task_description, expires_at)
			VALUES ($1, $2, $3, $4)
		`,
		taskGroupId,
		t.Title,
		t.Description,
		t.ExpiresAt,
	)
	return err
}

func (d db) GetTasksByGroup(groupID int) ([]domain.Task, error) {
	tasks := []domain.Task{}
	err := d.conn.Select(
		&tasks,
		`SELECT 
			id,
			task_group_id, 
			title, 
			task_description, 
			is_completed, 
			expires_at, 
			created_at 
		FROM tasks 
		WHERE task_group_id = $1`,
		groupID,
	)
	return tasks, err
}

func (d db) InsertGrade(g domain.Grade) error {
	_, err := d.conn.Exec(`
		INSERT INTO grades (member_id, task_group_id, score, grade_date)
		VALUES ($1, $2, $3, $4)`,
		g.MemberID,
		g.TaskGroupID,
		g.Score,
		g.GradeDate,
	)
	return err
}

func (d db) GetGradesByMember(memberID int, groupID int) ([]domain.Grade, error) {
	var grades []domain.Grade
	err := d.conn.Select(
		&grades,
		`
			SELECT (id, member_id, task_group_id, score, grade_date, created_at) 
			FROM grades 
			WHERE member_id = $1 AND task_group_id = $2 
			ORDER BY grade_date DESC
		`,
		memberID,
		groupID,
	)
	return grades, err
}

func (d db) GetExpiresTasksFromSpace(spaceId string) ([]domain.TaskIntroDTO, error) {
	tasks := []domain.TaskIntroDTO{}
	err := d.conn.Select(
		&tasks,
		`
			SELECT t.id, t.title, t.task_description, t.expires_at
			FROM task_groups tg 
			JOIN tasks t 
			ON t.task_group_id = tg.id
			WHERE expires_at > NOW() AND space_id = $1;
		`,
		spaceId,
	)
	return tasks, err
}

func (d db) DeleteTaskGroup(groupID int) error {
	_, err := d.conn.Exec(`DELETE FROM task_groups WHERE id = $1`, groupID)
	return err
}

func (d db) DeleteTask(taskID int) error {
	_, err := d.conn.Exec(`DELETE FROM tasks WHERE id = $1`, taskID)
	return err
}
