import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipesDto, UpdateRecipeDto } from './dto/recipes.dto';
import { responseHandler } from 'src/utilities/responseHandler';
import { error } from 'console';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}

  @Get()
  async getRecipes(@Res() response) {
    try {
      const recipeList = await this.recipeService.getRecipes();
      return response.status(HttpStatus.CREATED).json({
        message: 'All data found successfully',
        recipeList,
      });
    } catch {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Recipe not created!',
        error: 'Bad Request',
      });
    }
  }

  @Post()
  async createRecipe(
    @Res() response,
    @Body() createRecipeDto: CreateRecipesDto,
  ) {
    try {
      const newRecipe = await this.recipeService.createRecipes(createRecipeDto);
      return responseHandler(
        response,
        HttpStatus.CREATED,
        'Successfully created recipe!',
        newRecipe,
      );
    } catch (err) {
      return responseHandler(
        response,
        HttpStatus.BAD_REQUEST,
        'Failed Adding Recipe',
        err,
      );
    }
  }

  @Put('/:id')
  async updateRecipe(
    @Res() response,
    @Param('id') recipeId: string,
    @Body() input: UpdateRecipeDto,
  ) {
    try {
      const existingRecipe = await this.recipeService.updateRecipe(
        recipeId,
        input,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Recipe has been updated!',
        existingRecipe,
      });
    } catch {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error while updating the recipe',
        error: 'Bad Request',
      });
    }
  }

  @Delete('/:id')
  async deleteRecipe(@Res() response, @Param('id') recipeId: string) {
    try {
      const deleteRecipe = await this.recipeService.deleteRecipe(recipeId);
      return response.status(HttpStatus.OK).json({
        message: 'Recipe has been deleted!',
        deleteRecipe,
      });
    } catch {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error while deleting the recipe',
        error: 'Bad Request',
      });
    }
  }
}
