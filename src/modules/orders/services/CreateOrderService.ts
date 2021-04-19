import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { Order } from '../typeorm/entities/Orders';

interface IProduct {
  id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository: OrdersRepository = getCustomRepository(
      OrdersRepository,
    );

    const customerRepository: CustomerRepository = getCustomRepository(
      CustomerRepository,
    );

    const productRepository: ProductRepository = getCustomRepository(
      ProductRepository,
    );

    const customer = await customerRepository.findById(customer_id);

    if (!customer) throw new AppError('Customer not found');

    // método findAllByIds retorna todas as instâncias encontradas
    // dentro do banco de dados da aplicação
    const existsProducts = await productRepository.findAllByIds(products);

    // se nenhuma instancia foi encontrada
    if (!existsProducts.length)
      throw new AppError('Could not found any product with given ids');

    const existsProductsIds = existsProducts.map(product => product.id);

    // compara existsProductsIds com o array de elementos products
    // que foi passado por parametro

    // pega os produtos que não foram retornados
    // pelo método findAllByIds
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length)
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
      );

    // do array enviado compara-se cada quantidade dos produtos enviados
    // com os produtos dentro do "estoque" (cadastrados na aplicação)
    const quantityAvaliable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    // não permite vender mais do que há no estoque
    if (quantityAvaliable.length)
      throw new AppError(
        `The quantity ${quantityAvaliable[0].quantity} is not avaliable for ${quantityAvaliable[0].id}`,
      );

    // monta o objeto que precisa ser salvo no banco de dados da aplicação

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepository.createOrder({
      customer,
      products: serializedProducts,
    });

    const { orders_products } = order;

    const updatedProductQuantity = orders_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}
