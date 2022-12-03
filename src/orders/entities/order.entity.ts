import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

export class Order {
  id?: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[];
}