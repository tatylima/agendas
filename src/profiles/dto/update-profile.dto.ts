import { PartialType } from '@nestjs/swagger';
import { createProfileDto } from './create-profile.dto'; 

export class UpdateProfileDto extends PartialType(createProfileDto) {}