import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { handlerError } from '../../common/utils/handler-error.utils';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  public async create(createUserDto: CreateUserDto) {
    try {
      const { userName, password } = createUserDto;

      const existingUser = await this.userRepository.findOneBy({ userName });
      if (existingUser) {
        throw new BadRequestException(`Usuario con el username: ${userName} ya existe`);
      }

      const passwordEncrypted = await this.encryptPassword(password);

      const user = this.userRepository.create({
        userName: userName,
        password: passwordEncrypted
      });
      const userCreated = await this.userRepository.save(user);

      return await this.findOne(userCreated.id);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findAll() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new NotFoundException(`User with id ${id} not found.`);
      return user;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findByUserName(userName: string) {
    try {
      return this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.user_name = :userName', { userName })
        .getOne();
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findByToken(token: string) {
    try {
      return this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.token')
        .where('user.token = :token', { token })
        .getOne();
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
      const user = await this.userRepository.preload({
        id: id,
        ...updateUserDto
      });
  
      if ( !user ) throw new NotFoundException(`User with id ${id} not found`);
  
      try {
        await this.userRepository.save(user);
        return user;
      } catch (error) {
        handlerError(error, this.logger);
      }
  }

  private async encryptPassword(password: string) {
    return bcrypt.hashSync(password, +process.env.HASH_SALT!);
  }
}
