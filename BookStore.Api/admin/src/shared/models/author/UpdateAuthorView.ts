import { Ganre } from "../ganre/Ganre";

export interface UpdateAuthorView {    
    id: string,
    firstName: string,
    secondName: string,
    birthDay: Date,
    dayOfDeath?: Date,
    gangeId: string,
    ganres: Ganre[],
    products: string[],
    isAvtive: boolean,
}