import { Injectable, NotFoundException } from '@nestjs/common';
import { Auth_idDto } from './authId.dto';
import { AuthDto } from './auth.dto';

const URL_user = 'http://localhost:3030/user'

@Injectable()
export class AuthService {

    private async getAll(): Promise<Auth_idDto[]> {
        const res = await fetch(URL_user);
        const parsed = await res.json();
        return parsed;
    }

    async getUser(): Promise<AuthDto[]> {
        return await this.getAll();
    }

    async getAuthByUser(user: string): Promise<Auth_idDto[]> {
        const res = await fetch(URL_user);
        const parsed = await res.json();
        const list = parsed.filter((user) => user.user === user)
        if (!list.length) throw new NotFoundException(`Not found ${user} in registry.`)
        return list;
    }

    async getUserById(id: number): Promise<AuthDto> {
        const res = await fetch(URL_user + id);
        const parsed = await res.json();
        return parsed;
    }

    async createUser(user: AuthDto): Promise<AuthDto> {
        const newUser = { ...user };
        const res = await fetch(URL_user, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        const parsed = await res.json()
        return parsed;
    }

    async deleteUserById(id: number): Promise<AuthDto> {
        const res = await fetch(URL_user + id, {
            method: 'DELETE',
        });
        const parsed = await res.json();
        return parsed;
    }

    async updateUserById(id: number, user: Auth_idDto): Promise<Auth_idDto> {
        const findUser = await this.getUserById(id);
        if (!Object.keys(findUser).length) return;
        const updateUser = { ...user, id };
        const res = await fetch(URL_user + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateUser)
        });
        const parsed = await res.json();
        return parsed;
    }
}
