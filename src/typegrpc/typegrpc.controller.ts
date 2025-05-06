import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TypeService } from '../pokemons/services/type.service';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';


@Controller()
export class TypegrpcController {
    constructor(private readonly typeService: TypeService) { }

    @GrpcMethod('TypeService', 'CreateType')
    async create(type: { name: string }) {
        try {
            return await this.typeService.create(type);
        } catch (error) {
            throw new RpcException({ code: status.INVALID_ARGUMENT, message: error.message });
        }
    }

    @GrpcMethod('TypeService', 'GetType')
    async get(type: { id: string }) {
        try {
            return await this.typeService.findOne(type.id);
        } catch (error) {
            throw new RpcException({ code: status.NOT_FOUND, message: error.message });
        }
    }

    @GrpcMethod('TypeService', 'UpdateType')
    async update(type: { id: string; name: string }) {
        try {
            return await this.typeService.update(type.id, { name: type.name });
        } catch (error) {
            if (error.name === 'NotFoundException') {
                throw new RpcException({ code: status.NOT_FOUND, message: error.message });
            }
            throw new RpcException({ code: status.INTERNAL, message: 'Failed to update type' });
        }
    }

    @GrpcMethod('TypeService', 'DeleteType')
    async delete(type: { id: string }) {
        try {
            await this.typeService.remove(type.id);
            return { success: true };
        } catch (error) {
            if (error.name === 'NotFoundException') {
                throw new RpcException({ code: status.NOT_FOUND, message: error.message });
            }
            throw new RpcException({ code: status.INTERNAL, message: 'Failed to delete type' });
        }
    }

    @GrpcMethod('TypeService', 'ListTypes')
    async list() {
        try {
            const types = await this.typeService.findAll();
            return { types };
        } catch (error) {
            throw new RpcException({ code: status.INTERNAL, message: 'Failed to fetch types' });
        }
    }
}
