import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';

@Entity({ name: 'types' })
export class TypeEntity extends BaseEntity {

    @Column({ type: 'varchar', length: '100', nullable: false, unique: true })
    name: string;

    @OneToMany(() => PokemonEntity, (pokemon) => pokemon.type)
    pokemons: PokemonEntity[];
}