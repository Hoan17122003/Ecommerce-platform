import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendUserConfirmation(user: { email: string; subject: string; content: string }) {
        // const url = `example.com/auth/confirm?token=${token}`;
        return await this.mailerService.sendMail({
            to: user.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Nice App! Confirm your Email',
            html: `hello sending`,
        });
    }
}
