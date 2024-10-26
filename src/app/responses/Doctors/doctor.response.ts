
import { Specialty } from "src/app/model/Specialty";
import { UserResponse } from "../users/user.responses";

export interface DoctorResponse {
    id: number;
    specialty: Specialty;
    experience: number;
    image_url:string;
    user_response: UserResponse;    
}