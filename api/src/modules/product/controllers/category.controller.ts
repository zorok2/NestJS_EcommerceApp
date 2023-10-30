import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { Category } from '../../../entities/product/category.entity';
import { CategoryService } from '../services/category.service';
import { ResponseBase } from 'src/shared/payload/response-base';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Categories Endpoint')
@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<ResponseBase> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseBase> {
    return this.categoryService.findById(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<ResponseBase> {
    return this.categoryService.findByName(name);
  }

  @Post()
  async create(@Body() category: Category): Promise<ResponseBase> {
    return this.categoryService.create(category);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() category: Category,
  ): Promise<ResponseBase> {
    category.categoryId = id;
    return this.categoryService.update(category);
  }
}
