import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mai.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
            // or
            useFactory: async () => ({
                transport: {
                    // port: 587,
                    // // service: 'gmail',
                    // secure: false,
                    // auth: {
                    //     user: '21T1020885@husc.edu.vn',
                    //     pass: 'az531534789',

                    // },
                    // service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    service: 'Gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'hoanpice32@gmail.com',
                        pass: 'HoanHa171203',
                        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
                        refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
                        accessToken: process.env.GOOGLE_MAILER_ACCESS_TOKEN,
                    },
                },
                defaults: {
                    from: '"No Reply" <hoanpice32@gmail.com>',
                },
            }),
        }),
    ],
    providers: [MailService],
    exports: [MailService], // 👈 export for DI
})
export class MailModule {}
