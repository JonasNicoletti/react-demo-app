import { Feature } from "./feature";

export interface User {
    id?: string
    name: string
    email: string
    password?: string
    features?: Feature[]
}