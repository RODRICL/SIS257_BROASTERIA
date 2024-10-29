import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombres no debe ser vacío' })
  @IsString({ message: 'El campo nombres debe ser de tipo cadena' })
  @MaxLength(30, {message: 'El campo nombres no debe ser nemor a 50 caracteres'})
  @MinLength(4, {message: 'El campo nombres no debe ser mayor a 4 caracteres'})
  readonly nombres: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellidos no debe ser vacío' })
  @IsString({ message: 'El campo apellidos debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El campo apellidos no debe ser nemor a 50 caracteres'})
  @MinLength(4, {message: 'El campo apellidos no debe ser mayor a 4 caracteres'})
  readonly apellido_paterno: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellidos no debe ser vacío' })
  @IsString({ message: 'El campo apellidos debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El campo apellidos no debe ser nemor a 50 caracteres'})
  @MinLength(4, {message: 'El campo apellidos no debe ser mayor a 4 caracteres'})
  readonly apellido_materno: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo telefono no debe ser vacío' })
  @IsString({ message: 'El campo telefono debe ser de tipo cadena' })
  @MaxLength(8, { message: 'El campo telefono no debe ser nemor a 8 caracteres' })
  @MinLength(4, {message: 'El campo telefono no debe ser mayor a 4 caracteres'})
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo direccion no debe ser vacío' })
  @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
  @MaxLength(250, { message: 'El campo direccion no debe ser nemor a 30 caracteres'})
  @MinLength(4, { message: 'El campo direccion no debe ser mayor a 4 caracteres'})
  readonly direccion: string;
}
