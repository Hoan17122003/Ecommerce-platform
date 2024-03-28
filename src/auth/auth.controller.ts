import { Controller, Get, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {} from '../account/dto/account.dto'

@Controller('Auth')
export class AuthController {
    constructor(private readonly AuthServicev) { }

    @Get('signup')
    async signUp(@Body() data: any) {
        return this.AuthServicev.signUp();
    }
}