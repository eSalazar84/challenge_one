import {
    Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, NotFoundException, BadRequestException, ValidationPipe,
    UsePipes, ParseIntPipe, Query
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Auth_idDto } from './authId.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get()
    async getUser(@Res() res, @Query('user') user?: string): Promise<Auth_idDto[]> {
        try {
            if (user) {
                const serviceRes = await this.authService.getAuthByUser(user);
                if (serviceRes) return res.status(HttpStatus.OK).send(serviceRes);
            } else {
                const serviceRes = await this.authService.getUser();
                return res.status(HttpStatus.OK).send(serviceRes)
            }
        } catch (err) {
            throw res.status(HttpStatus.NOT_FOUND).json({ message: `Couldn't found ${user} in registry.`, statusCode: 404 })
        }
    }

    @Get(':id')
    async getUserById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number, @Res() res): Promise<AuthDto> {
        try {
            const serviceRes = await this.authService.getUserById(id)
            if (Object.keys(serviceRes).length) {
                return res.status(HttpStatus.OK).json(serviceRes)
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({ message: `registration ${id} does not exist`, statusCode: 404 })
            }
        } catch (err) {
            throw new NotFoundException(`Cannot get user with id ${id}`);
        }
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createUser(@Body() user: AuthDto, @Res() res): Promise<AuthDto> {
        try {
            const serviceRes = await this.authService.createUser(user)
            if (serviceRes) return res.status(HttpStatus.CREATED).send(serviceRes)
        } catch (err) {
            throw new BadRequestException('user creation failed.');
        }
    }

    @Delete(':id')
    async deleteUserById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number, @Res() res): Promise<AuthDto> {
        try {
            const serviceRes = await this.authService.deleteUserById(id);
            if (serviceRes) return res.status(HttpStatus.OK).send({ message: 'Deleted record', statusCode: 200 });
        } catch (err) {
            throw res.status(HttpStatus.NOT_FOUND).json({ message: `registry ${id} does not exist`, statusCode: 404 })
        }
    }

    @Put()
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateUserById(@Param('id') id: number, @Body() user: Auth_idDto, @Res() res): Promise<AuthDto> {
        try {
            const serviceRes = await this.authService.updateUserById(id, user);
            if (Object.keys(serviceRes).length) {
                return res.status(HttpStatus.ACCEPTED).send({ message: `Registry  ${id} successfully modified.`, statusCode: 202 })
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({ message: `registry ${id} does not exist.`, statusCode: 404 })
            }
        } catch (err) {
            throw new BadRequestException('Update failed');
        }
    }

}
