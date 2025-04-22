import { Test, TestingModule } from '@nestjs/testing';
import { TypeService } from './type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeEntity } from '../entities/type.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

//mockeando la entidad
const mockType: TypeEntity = {
  id: 'uuid-1234',
  name: 'fire',
  pokemons: [],
  createdAt: new Date('2024-02-02'),
  updatedAt: new Date('2024-02-02'),
};

describe('TypeService', () => {
  let service: TypeService;
  let repository: jest.Mocked<Repository<TypeEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeService,
        {
          provide: getRepositoryToken(TypeEntity),
          //mockeando el repository
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TypeService>(TypeService);
    repository = module.get(getRepositoryToken(TypeEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new type', async () => {
      // Arrange
      repository.create.mockReturnValue(mockType);  // Simula la creación de un tipo
      repository.save.mockResolvedValue(mockType);  // Simula el guardado de un tipo

      // Act
      const result = await service.create({ name: 'fire' });  // Ejecuta la acción

      // Assert
      expect(result).toEqual(mockType);  // Verifica que el resultado sea el tipo mockeado
      expect(repository.create).toHaveBeenCalledWith({ name: 'fire' });  // Verifica que se haya llamado a 'create' con el parámetro correcto
      expect(repository.save).toHaveBeenCalledWith(mockType);  // Verifica que se haya llamado a 'save' con el tipo mockeado
    });
  });

  describe('findAll', () => {
    it('should return all types', async () => {
      // Arrange
      repository.find.mockResolvedValue([mockType]);  // Simula que 'find' devuelve una lista con el tipo mockeado

      // Act
      const result = await service.findAll();  // Ejecuta la acción

      // Assert
      expect(result).toEqual([mockType]);  // Verifica que el resultado sea la lista con el tipo mockeado
    });
  });

  describe('findOne', () => {
    it('should return a type by id', async () => {
      // Arrange
      repository.findOneBy.mockResolvedValue(mockType);  // Simula que 'findOneBy' devuelve el tipo mockeado

      // Act
      const result = await service.findOne('uuid-1234');  // Ejecuta la acción

      // Assert
      expect(result).toEqual(mockType);  // Verifica que el resultado sea el tipo mockeado
    });

    it('should throw NotFoundException if type not found', async () => {
      // Arrange
      repository.findOneBy.mockResolvedValue(null);  // Simula que no se encuentra el tipo

      // Act & Assert
      await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);  // Verifica que se lance la excepción
    });
  });

  describe('update', () => {
    it('should update and return the updated type', async () => {
      // Arrange
      repository.preload.mockResolvedValue(mockType);  // Simula que 'preload' carga el tipo mockeado
      repository.save.mockResolvedValue(mockType);  // Simula que 'save' guarda el tipo actualizado

      // Act
      const result = await service.update('uuid-1234', { name: 'water' });  // Ejecuta la acción

      // Assert
      expect(result).toEqual(mockType);  // Verifica que el resultado sea el tipo mockeado
      expect(repository.save).toHaveBeenCalledWith(mockType);  // Verifica que se haya llamado a 'save' con el tipo actualizado
    });

    it('should throw NotFoundException if type not found', async () => {
      // Arrange
      repository.preload.mockResolvedValue(undefined);  // Simula que no se encuentra el tipo

      // Act & Assert
      await expect(service.update('non-existent-id', { name: 'electric' })).rejects.toThrow(NotFoundException);  // Verifica que se lance la excepción
    });
  });

  describe('remove', () => {
    it('should remove a type by id', async () => {
      // Arrange
      repository.findOneBy.mockResolvedValue(mockType);  // Simula que 'findOneBy' devuelve el tipo mockeado
      repository.remove.mockResolvedValue(mockType);  // Simula que 'remove' elimina el tipo y lo retorna

      // Act & Assert
      await expect(service.remove('uuid-1234')).resolves.not.toThrow();  // Verifica que no se lance ninguna excepción
      expect(repository.remove).toHaveBeenCalledWith(mockType);  // Verifica que se haya llamado a 'remove' con el tipo mockeado
    });
  });
});
