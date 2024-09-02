import { IsNotEmpty, isString, IsString } from 'class-validator';

export class CreateRecipesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  timeTaken: string;

  @IsString()
  instruction: string;
}

export class UpdateRecipeDto {
  @IsString()
  name: string;

  @IsString()
  timeTaken: string;

  @IsString()
  instruction: string;
}
