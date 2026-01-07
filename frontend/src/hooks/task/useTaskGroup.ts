import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, createTaskGroup, getTasksFromGroup, getMemberHistory, getTasksGroupsBySpaceId, setGrade, getTaskGroupById, getTasksFromSpace, deleteTask, deleteTaskGroup, updateTaskGroupTitle } from "../../api/task";
import type { CreateTaskDTO, CreateTaskGroupDTO, Grade, Task, TaskGroup } from "../../types/task";

export const useTasksGroups = (spaceId: number | null) => {
    return useQuery<TaskGroup[], Error>({
        queryKey: ["taskGroups", spaceId],
        enabled: !!spaceId,
        queryFn: () => getTasksGroupsBySpaceId(spaceId!),
    });
};

export const useCreateTaskGroup = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, CreateTaskGroupDTO>({
        mutationFn: (groupData: CreateTaskGroupDTO) => createTaskGroup(groupData),
        onSuccess: (_, v) => {
            queryClient.invalidateQueries({ queryKey: ["taskGroups", v.space_id] });
        },
    });
};

export const useGetTaskGroup = (groupId: number | null) => {
    return useQuery<TaskGroup, Error>({
        queryKey: ["taskGroup", groupId],
        enabled: !!groupId,
        queryFn: () => getTaskGroupById(groupId!),
    });
}

export const useUpdateTaskGroupTitle = (spaceId: number, taskGroupId: number) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, string>({
        mutationFn: (taskGroupTitle: string) => updateTaskGroupTitle(taskGroupId, {task_group_name: taskGroupTitle}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["taskGroups", spaceId] });
        },
    });
}

export const useGetTasksFromGroup = (groupId: number | null) => {
    return useQuery<Task[], Error>({
        enabled: !!groupId,
        queryFn: () => getTasksFromGroup(groupId!),
        queryKey: ["tasks", groupId],
    });
};

export const useGetTasksFromSpace = (spaceId: number | null) => {
    return useQuery<Task[], Error>({
        enabled: !!spaceId,
        queryFn: () => getTasksFromSpace(spaceId!),
        queryKey: ["tasks", spaceId],
    });
}

export const useCreateTask = (taskGroupId: number) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, CreateTaskDTO>({
        mutationFn: (taskData: CreateTaskDTO) => createTask(taskData, taskGroupId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", taskGroupId] });
        },
    });
};


export const useDeleteTask = (taskGroupId: number) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, number>({
        mutationFn: (taskId: number) => deleteTask(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", taskGroupId] });
        },
    });
};

export const useDeleteTaskGroup = (spaceId: number) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, number>({
        mutationFn: (taskGroupId: number) => deleteTaskGroup(taskGroupId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["taskGroups", spaceId] });
        },
    });
};

export const useMemberHistory = (memberId: number, groupId: number) => {
    return useQuery<Grade[], Error>({
        queryKey: ["history", memberId, groupId],
        queryFn: () => getMemberHistory(memberId, groupId),
        enabled: !!memberId && !!groupId,
    });
};

export const useSetGrade = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, Grade>({
        mutationFn: (gradeData: Grade) => setGrade(gradeData),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ 
                queryKey: ["history", variables.member_id, variables.task_group_id] 
            });
        },
    });
};