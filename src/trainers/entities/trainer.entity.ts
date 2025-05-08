import { BaseEntity } from '../../common/entities/base.entity';
import { PokemonEntity } from '../../pokemons/entities/pokemon.entity';
import { Check, Column, Entity, OneToMany } from 'typeorm';

@Check(`"age" >= 10 AND "age" <= 120`)
@Entity({ name: 'trainers' })
export class TrainerEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', name: 'second_name', nullable: false })
    secondName: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'varchar' })
    region: string;

    @Column({ type: 'int', default: 0 })
    badges: number;

    @OneToMany(() => PokemonEntity, (pokemon) => pokemon.trainer)
    pokemons: PokemonEntity[];
}
