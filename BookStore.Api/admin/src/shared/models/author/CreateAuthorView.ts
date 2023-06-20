export interface CreateAuthorView {
    firstName: string,
    secondName: string,
    birthDay: Date,
    dayOfDeath?: Date,
    ganres: string[],
    products: string[]
}