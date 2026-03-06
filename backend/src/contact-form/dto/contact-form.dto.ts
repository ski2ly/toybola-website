import { IsString, IsEmail, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';

export enum ContactTopic {
  COOPERATION = 'cooperation',
  WHOLESALE = 'wholesale',
  QUESTION = 'question',
  SUPPORT = 'support',
  OTHER = 'other'
}

export enum ContactStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived'
}

export class CreateContactFormSubmissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsOptional()
  message?: string;
}

export class UpdateContactStatusDto {
  @IsEnum(ContactStatus)
  @IsNotEmpty()
  status: string;
}
