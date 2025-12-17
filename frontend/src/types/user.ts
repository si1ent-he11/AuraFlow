export interface UserType {
    id?: number;
    username: string;
    email: string;
    password?: string;
}

export interface UserLoginRequestDTO {
    email: string;
    password: string;
}

export interface UserTypeDTO {
    id: number;
    username: string;
    email: string;
}
