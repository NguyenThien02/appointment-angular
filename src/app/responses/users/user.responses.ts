import { Role } from "src/app/model/role";

export interface UserResponse {
    id: number;
    full_name: string;
    phone_number: string;
    address:string;
    birthday: Date;
    role: Role;    
}