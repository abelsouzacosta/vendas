import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrdersProducts } from './OrdersProducts';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // existe um relacionamento de muitos para 1
  // onde várias ordens de compra
  // podem existir para um único cliente
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // uma compra (order) pode ser representada diversas vezes dentro da tabela de relacionamento
  // entre compra (order) e produtos (products) uma vez que uma compra pode ter vários
  // produtos
  @OneToMany(() => OrdersProducts, orders_products => orders_products.order, {
    cascade: true,
  })
  orders_products: OrdersProducts[];

  @Column()
  customer_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
