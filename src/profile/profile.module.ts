import { Module } from '@nestjs/common';
import { ProfilesService } from './profile.service';
import { ProfilesController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
