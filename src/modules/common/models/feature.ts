import { Entry } from "./entry";

export interface Feature {
    id?: number;
    title: string;
    entries: Entry[];
}