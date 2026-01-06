export interface Task {
  id: number;
  task_group_id: number;
  title: string;
  description: string;
  is_completed?: boolean; 
  expires_at: string; 
  created_at?: string;
}

export interface CreateTaskDTO {
	title:       string;  
	description?: string;
	expires_at?:   string;
}

export interface TaskGroup {
  id: number;
  space_id: number;
  created_by: number; 
  task_group_name: string;
  min_score: number;
  max_score: number;
}

export interface CreateTaskGroupDTO {
  space_id: number;
  created_by: number; 
  task_group_name: string;
  min_score: number;
  max_score: number;
}

export interface TaskGroupDTO {
  task_group_name: string;
  min_score: number;
  max_score: number;
}


export interface Grade {
  id?: number;
  member_id: number;
  task_group_id: number;
  score: number;
  grade_date: string;
  created_at?: string;
}

export interface UserRow {
  member_id: number;
  username_in_space: string;
  all_grades: Grade[];
}