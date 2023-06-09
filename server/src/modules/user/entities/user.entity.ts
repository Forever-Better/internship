import { Follower } from 'src/modules/follower/entities/follower.entity';
import { Like } from 'src/modules/like/entities/like.entity';
import { Post } from 'src/modules/post/entities/post.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  university: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => Follower, (follower) => follower.user)
  following: Follower[];

  @OneToMany(() => Follower, (follower) => follower.followingTo)
  followers: Follower[];

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];

  @OneToMany(() => Like, (likes) => likes.user)
  likes: Like[];

  @Column({ nullable: true })
  cover: string;
}
