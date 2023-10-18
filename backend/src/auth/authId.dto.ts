import { IsInt, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class Auth_idDto {
    @Expose()
    @IsInt()
    @IsNotEmpty()
    id: number;

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