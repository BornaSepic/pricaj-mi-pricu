import { IsString } from "class-validator";

export class CreateRegistrationCodeDto {
    @IsString()
    code: string;
}
