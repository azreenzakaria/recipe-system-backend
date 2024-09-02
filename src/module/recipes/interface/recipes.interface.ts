import { Document } from 'mongoose';
export interface IRecipes extends Document {
  readonly name: string;
  readonly timeTake: string;
  readonly instruction: string;
}
