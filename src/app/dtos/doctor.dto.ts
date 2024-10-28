import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsDate
} from 'class-validator';

export class DoctorDTO {
    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    specialty_id: number;

    @IsNotEmpty()
    experience: number;

    constructor(data: any) {
        this.user_id = data.doctor_id;
        this.specialty_id = data.specialty_id
        this.experience = data.experience;
    }
}