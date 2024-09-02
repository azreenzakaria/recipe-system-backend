import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Recipes {
  @Prop()
  name: string;

  @Prop()
  timeTaken: number;

  @Prop()
  instruction: string;
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
