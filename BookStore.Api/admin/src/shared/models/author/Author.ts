import { Genre } from "../genre/Genre";

export interface Author {
    id: string,
    creationDate: string,
    isActive: boolean,
    isDeleted: boolean,
    firstName: string,
    secondName: string,
    birthDay: string,
    dayOfDeath?: string,
    ganres: Genre[],
}