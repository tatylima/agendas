import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";

export class Profile {
    id?: string;
    name: string;
    image: string;
    user?: User;
    products?: Product[];
    createdAt?: Date;
    updatedAt?: Date;
  }