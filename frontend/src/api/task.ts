import type { CreateTaskDTO, CreateTaskGroupDTO, Grade, TaskGroupUpdateTitleDTO } from "../types/task";
import { fetchWithAuth } from "./auth";

export const createTaskGroup = (groupData: CreateTaskGroupDTO) => {
    return fetchWithAuth(`http://localhost:8080/spaces/${groupData.space_id}/task-groups`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
    });
}

export const getTasksGroupsBySpaceId = (spaceId: number) => {
    return fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/task-groups`, {
        method: "GET",
        credentials: "include",
    });
}

export const getTaskGroupById = (groupId: number) => {
    return fetchWithAuth(`http://localhost:8080/spaces/task-groups/${groupId}`, {
        method: "GET",
        credentials: "include",
    });
}

export const createTask = (taskData: CreateTaskDTO, taskGroupId: number) => {
    return fetchWithAuth(`http://localhost:8080/spaces/task-groups/${taskGroupId}/tasks`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });
}

export const getTasksFromGroup = (groupId: number) => {
    return fetchWithAuth(`http://localhost:8080/spaces/task-groups/${groupId}/tasks`, {
        method: "GET",
        credentials: "include",
    });
}

export const getTasksFromSpace = (spaceId: number) => {
    return fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/tasks`, {
        method: "GET",
        credentials: "include",
    });
}

export const setGrade = (gradeData: Grade) => {
    return fetchWithAuth(`http://localhost:8080/spaces/grades`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gradeData),
    });
}

export const getMemberHistory = (memberId: number, groupId: number) => {
    return fetchWithAuth(`http://localhost:8080/spaces/members/${memberId}/task-groups/${groupId}/history`, {
        method: "GET",
        credentials: "include",
    });
}

export const updateTaskGroupTitle = (groupId: number, taskGroupTitle: TaskGroupUpdateTitleDTO) => {
    return fetchWithAuth(`http://localhost:8080/spaces/task-groups/${groupId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskGroupTitle),
    });
}

export const deleteTaskGroup = (taskGroupId: number) => {
    return fetchWithAuth(`http://localhost:8080/spaces/task-groups/${taskGroupId}`, {
        method: "DELETE",
        credentials: "include",
    })
}

export const deleteTask = (taskId: number) => {
    return fetchWithAuth(`http://localhost:8080/spaces/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
    })
}

