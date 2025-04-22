import { Test, TestingModule } from '@nestjs/testing';
import { TypeController } from './type.controller';
import { TypeService } from '../services/type.service';
import { CreateTypeDto } from '../dto/create-type.dto';
import { UpdateTypeDto } from '../dto/update-type.dto';
import { TypeEntity } from '../entities/type.entity';

describe('TypeController', () => {
  let controller: TypeController;
  let service: jest.Mocked<TypeService>;

  const mockType: TypeEntity = {
    id: 'uuid-1234',
    name: 'fire',
    pokemons: [],
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeController],
      providers: [
        {
          provide: TypeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TypeController>(TypeController);
    service = module.get(TypeService);
  });

  describe('create', () => {
    it('should create a new type', async () => {
      // Arrange
      const dto: CreateTypeDto = { name: 'fire' };
      service.create.mockResolvedValue(mockType);

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(result).toEqual(mockType);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of types', async () => {
      // Arrange
      service.findAll.mockResolvedValue([mockType]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual([mockType]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one type by id', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockType);

      // Act
      const result = await controller.findOne('uuid-1234');

      // Assert
      expect(result).toEqual(mockType);
      expect(service.findOne).toHaveBeenCalledWith('uuid-1234');
    });
  });

  describe('update', () => {
    it('should update and return the updated type', async () => {
      // Arrange
      const dto: UpdateTypeDto = { name: 'water' };
      service.update.mockResolvedValue({ ...mockType, name: 'water' });

      // Act
      const result = await controller.update('uuid-1234', dto);

      // Assert
      expect(result).toEqual({ ...mockType, name: 'water' });
      expect(service.update).toHaveBeenCalledWith('uuid-1234', dto);
    });
  });

  describe('remove', () => {
    it('should delete a type by id', async () => {
      // Arrange
      service.remove.mockResolvedValue(undefined);

      // Act
      const result = await controller.remove('uuid-1234');

      // Assert
      expect(result).toEqual(undefined);
      expect(service.remove).toHaveBeenCalledWith('uuid-1234');
    });
  });
});
