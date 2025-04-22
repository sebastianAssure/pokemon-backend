import { BaseEntity } from '../../common/entities/base.entity';
import { TrainerEntity } from '../../trainers/entities/trainer.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TypeEntity } from './type.entity';

@Check(`"level" >= 1 AND "level" <= 100`)
@Entity({ name: 'pokemons' })
export class PokemonEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false, unique: true })
    name: string;

    @Column({ type: 'int', nullable: false })
    level: number;

    @ManyToOne(() => TypeEntity, { nullable: false, eager: true })
    @JoinColumn({ name: 'type_id' })
    type: TypeEntity;
  
    @ManyToOne(() => TrainerEntity, { nullable: true, eager: true })
    @JoinColumn({ name: 'trainer_id' })
    trainer: TrainerEntity | null;

    @Column({ type: 'int', nullable: false })
    attack: number;

    @Column({ type: 'int', nullable: false })
    defense: number;

    @Column({ type: 'int', nullable: false })
    speed: number;

    @Column({ type: 'boolean', default: false, name: 'is_legendary', nullable: false,  })
    isLegendary: boolean;
}
