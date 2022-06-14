import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';
import { GamesModule } from './games/game.module';
import { GendersModule } from './genre/genre.module';
import { HomepageModule } from './homepage/homepage.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfilesModule } from './profile/profile.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    GamesModule,
    GendersModule,
    PrismaModule,
    ProfilesModule,
    UsersModule,
    AuthModule,
    FavoriteModule,
    HomepageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
