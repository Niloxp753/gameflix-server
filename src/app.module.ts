import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { GendersModule } from './genders/genders.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GamesModule,
    GendersModule,
    PrismaModule,
    ProfilesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
