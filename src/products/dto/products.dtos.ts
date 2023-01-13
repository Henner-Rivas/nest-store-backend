import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;
  @IsString()
  @IsNotEmpty()
  readonly image: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
