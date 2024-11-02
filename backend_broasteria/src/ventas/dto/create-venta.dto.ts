import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsNumber } from 'class-validator';

export class CreateVentaDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idCliente debe estar definido' })
  @IsNumber({}, { message: 'El campo idCliente debe ser tipo numérico' })
  readonly idCliente: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo fechaVenta debe estar definido' })
  @IsDateString({}, { message: 'El campo fechaVenta debe ser de tipo fecha' })
  readonly fechaVenta: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo total debe estar definido' })
  @IsNumber({}, { message: 'El campo total debe ser tipo numérico' })
  readonly total: number;
}
