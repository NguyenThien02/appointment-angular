import { Schedule } from "./Schedule";

export interface Profile{
    id: number;  
    schedule: Schedule;
    diagnosis: string;
    treatment:string;
    medications: string;
    total_money: number;
    total_insurance_money: number;
    created_at: number;
}