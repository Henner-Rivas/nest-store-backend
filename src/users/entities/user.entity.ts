import { Exclude } from 'class-transformer';
import { Customer } from 'src/customers/entities/customer.entity';
import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  @Exclude()
  password: string;
  @Column({ type: 'varchar' })
  role: string;

  @OneToOne(() => Customer, (customer) => customer.User, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({
    name: 'created_at',

    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    name: 'updated_at',

    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
