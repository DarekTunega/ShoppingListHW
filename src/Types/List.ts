import { User } from "./User";

export interface List{
    id: string;
    name : string;
    items: Item[];
    users: User[];
}

export interface Item{
    id: string;
    name : string;
    isCompleted: boolean;    
}