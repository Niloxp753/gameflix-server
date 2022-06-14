import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/user/entities/user.entity';

export class Profile {
  id?: string;
  title: string;
  imageURL: string;
  user?: User;
  games?: Game[];
  createdAt?: Date;
  updatedAt?: Date;
}
