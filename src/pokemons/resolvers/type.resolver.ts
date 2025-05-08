import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TypeModel } from '../models/type.model';
import { TypeService } from '../services/type.service';
import { CreateTypeInputDto } from '../dto/create-type.input.dto';
import { UpdateTypeInputDto } from '../dto/update-type.input.dto';
import { MessageResponseModel } from '../models/message-response.model';

@Resolver(() => TypeModel)
export class TypeResolver {
    constructor(private readonly typeServices: TypeService) { }

    @Mutation(() => TypeModel, { name: 'createType' })
    create(@Args('createTypeInput') createTypeInput: CreateTypeInputDto) {
        return this.typeServices.create(createTypeInput);
    }

    @Query(() => [TypeModel], { name: 'types' })
    findAll() {
        return this.typeServices.findAll();
    }

    @Query(() => TypeModel, { name: 'type' })
    findOne(@Args('id') id: string) {
        return this.typeServices.findOne(id);
    }

    @Mutation(() => TypeModel, { name: 'updateType' })
    update(@Args('updateTypeInput') updateTypeInput: UpdateTypeInputDto) {
        return this.typeServices.update(updateTypeInput.id, updateTypeInput);
    }

    @Mutation(() => MessageResponseModel, { name: 'removeType' })
    remove(@Args('id') id: string) {
        return this.typeServices.remove(id);
    }
}
