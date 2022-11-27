import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService {
  findAll() {
    return "Buscar todas os produtos";
  }

  create() {
    return "Criar um pedido";
  }
}