import { Genre } from 'src/genre/entities/genre.entity';
import { Profile } from 'src/profile/entities/profile.entity';

export class Game {
  id?: string;
  title: string;
  coverImageUrl: string;
  description: string;
  year: number;
  imdbScore: number;
  trailerYoutubeUrl: string;
  gameplayYoutubeUrl: string;
  genres?: Genre[];
  profiles?: Profile[];
  createdAt?: Date;
  updatedAt?: Date;
}
