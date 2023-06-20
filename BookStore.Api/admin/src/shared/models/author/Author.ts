import { Genre } from "../genre/Genre";

export interface Author {
    id: string,
    firstName: string,
    secondName: string,
    ganres: string[],
    products: string[]

}