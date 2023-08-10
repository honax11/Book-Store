import { Genre } from "../genre/Genre";

export interface UpdateAuthorView {    
    id: string,
    firstName: string,
    secondName: string,
    birthDay: Date,
    dayOfDeath?: Date,
    gangeId: string,
    ganres: Genre[],
    products: string[],
    isAvtive: boolean,
}