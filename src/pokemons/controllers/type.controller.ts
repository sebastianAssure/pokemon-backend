import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TypeService } from '../services/type.service';
import { CreateTypeDto } from '../dto/create-type.dto';
import { UpdateTypeDto } from '../dto/update-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Types')
@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.typeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typeService.update(id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.typeService.remove(id);
  }
}
