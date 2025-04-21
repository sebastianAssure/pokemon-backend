import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'types' })
export class TypeEntity extends BaseEntity {

    @Column({ type: 'varchar', length: '100', nullable: false, unique: true })
    name: string;
}