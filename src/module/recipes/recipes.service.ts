import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRecipes } from './interface/recipes.interface';
import { CreateRecipesDto, UpdateRecipeDto } from './dto/recipes.dto';
import { error } from 'console';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('Recipes') private readonly recipeModel: Model<IRecipes>,
  ) {}

  async getRecipes(): Promise<IRecipes[]> {
    const recipes = await this.recipeModel.find();
    if (!recipes) throw new error('Recipes not found');
    return recipes;
  }

  async createRecipes(input: CreateRecipesDto): Promise<IRecipes> {
    const newRecipe = await new this.recipeModel(input);
    return newRecipe.save();
  }

  async updateRecipe(id: string, input: UpdateRecipeDto): Promise<any> {
    const exisitngRecipe = await this.recipeModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!exisitngRecipe) throw new error('Not available');
    return exisitngRecipe;
  }

  async deleteRecipe(recipeId: string): Promise<any> {
    const deleteRecipe = await this.recipeModel.findByIdAndDelete(recipeId);

    if (!deleteRecipe) throw new error('Not available');
    return deleteRecipe;
  }
}
