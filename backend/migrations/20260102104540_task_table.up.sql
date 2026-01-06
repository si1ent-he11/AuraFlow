CREATE TABLE IF NOT EXISTS task_groups (
    id SERIAL PRIMARY KEY,
    space_id INT REFERENCES spaces(id) ON DELETE CASCADE,
    created_by INT REFERENCES space_members(id) ON DELETE CASCADE,
    task_group_name VARCHAR(100) NOT NULL,
    min_score INT DEFAULT 0,
    max_score INT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    task_group_id INT REFERENCES task_groups(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    task_description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    member_id INT REFERENCES space_members(id) ON DELETE CASCADE,
    task_group_id INT REFERENCES task_groups(id) ON DELETE CASCADE,
    score INT NOT NULL,
    grade_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_member_grade_day UNIQUE (member_id, task_group_id, grade_date)
);