import { PartialType } from '@nestjs/swagger';
import { CreateGendersDto } from './create-genders.dto';

export class UpdateGendersDto extends PartialType(CreateGendersDto) {}
