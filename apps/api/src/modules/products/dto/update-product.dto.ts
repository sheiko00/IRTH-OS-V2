import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { ProductStatus } from '@prisma/client';

export class UpdateProductDto extends PartialType(OmitType(CreateProductDto, [] as const)) {
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
