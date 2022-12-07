import { Favorites } from "src/favorites/dto/entities/favorite-entity"; 

export class User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  favorites?: Favorites[];
}