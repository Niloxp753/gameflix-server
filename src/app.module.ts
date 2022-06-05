import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/game.module';
import { GendersModule } from './genre/genre.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfilesModule } from './profile/profile.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    GamesModule,
    GendersModule,
    PrismaModule,
    ProfilesModule,
    UsersModule,
    AuthModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
