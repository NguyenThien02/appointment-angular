import { UserResponse } from "../responses/users/user.responses";
import { TimeSlot } from "./TimeSlot";

export interface Schedule{
    id: number;
    userName: string;
    userPhone: string;
    date: Date;
    timeSlot: TimeSlot;
    
}