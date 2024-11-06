import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateInventarioDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsNumber({}, { message: 'El campo idProducto debe ser tipo numérico' })
  readonly idProducto: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idProveedor debe estar definido' })
  @IsNumber({}, { message: 'El campo idProveedor debe ser tipo numérico' })
  readonly idProveedor: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo cantidadDisponible debe estar definido' })
  @IsNumber(
    {},
    { message: 'El campo cantidadDisponible debe ser tipo numérico' },
  )
  readonly cantidadDisponible: number;
}
