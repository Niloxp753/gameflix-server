import { PartialType } from '@nestjs/mapped-types';
import { CreateGendersDto } from './create-genders.dto';

export class UpdateGendersDto extends PartialType(CreateGendersDto) {}
