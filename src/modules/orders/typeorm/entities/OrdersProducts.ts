import { Product } from '@modules/products/typeorm/entities/Product';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './Orders';

@Entity('orders_products')
export class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // dentro da tabela orders_products serão representadas
  // diversas vezes a entidade order que é uma compra
  @ManyToOne(() => Order, order => order.orders_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // dentro da tabela orders_products serão representados
  // diversas vezes a entidade produto (product) isso porque
  // um produto pode estar em muitas compras, mas uma compra
  // também pode ter muitos produtos
  @ManyToOne(() => Product, product => product.orders_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
