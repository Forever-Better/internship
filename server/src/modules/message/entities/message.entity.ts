import { User } from 'src/modules/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  // @ManyToOne(() => User, (user) => user.following)
  // from: User;

  // @ManyToOne(() => User, (user) => user.followers)
  // to: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
