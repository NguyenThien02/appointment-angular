import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsDate
} from 'class-validator';

export class ProfileDTO {
    schedule_id: number;

    @IsString()
    @IsNotEmpty()
    diagnosis: string;

    @IsString()
    @IsNotEmpty()
    treatment: string;

    @IsString()
    @IsNotEmpty()
    medications: string;

    constructor(data: any) {
        this.schedule_id = data.schedule_id;
        this.diagnosis = data.diagnosis;
        this.treatment = data.treatment;
        this.medications = data.medications;
    }
}