import { IsInt, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class AuthDto {
    @Expose()
    @IsInt()
    @IsNotEmpty()
    user: string;

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    password: string;
    
}