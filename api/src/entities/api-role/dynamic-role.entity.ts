import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dynamic-api-role')
export class DynamicApiRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  method: string;

  @Column()
  apiEndpoint: string;

  @Column({
    nullable: true,
  })
  service: string;

  @Column({
    type: 'jsonb',
  })
  roles: any;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: new Date(),
  })
  createdDate: Date;

  @Column({
    default: new Date(),
  })
  updatedDate: Date;
}

export enum HttpMethodEntity {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
