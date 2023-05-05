export interface IStories {
    userId: string;
    username: string;
    email: string;
    avatar: string;
    password: string;
    birthdate: Date;
    registeredAt: Date;
}

interface User {
    name?: string | null
    email?: string | null
    image?: string | null
}

export interface UserSession {
    user?: User
    expires: ISODateString
}
