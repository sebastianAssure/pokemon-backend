import { BaseEntity } from 'src/common/entities/base.entity';
import { Check, Column, Entity } from 'typeorm';

@Check(`"age" >= 10 AND "age" <= 120`)
@Entity({ name: 'trainers' })
export class TrainerEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    secondName: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'varchar' })
    region: string;

    @Column({ type: 'int' })
    badges: number;
}
