import {  PartialType } from '@nestjs/swagger';
import { CreatUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType (CreatUserDto) {}