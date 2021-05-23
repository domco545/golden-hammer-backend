import * as bcrypt from 'bcrypt';

export class AuthHelper{
    constructor() {}

    async hashPassword(password: string): Promise<string>{
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    async comparePassword(plainPass: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(plainPass, hash);
    }
}