import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column({ type: 'varchar', name: 'user_name',  length: 100, nullable: false, unique: true })
    userName: string;

    @Column({ type: 'varchar', select: false, nullable: false })
    password: string;

    @Column({ type: 'varchar', select: false, nullable: true })
    token: string;
}
