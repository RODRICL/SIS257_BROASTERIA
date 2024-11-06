import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetallesVentasService } from './detalles-ventas.service';
import { CreateDetallesVentaDto } from './dto/create-detalles-venta.dto';
import { UpdateDetallesVentaDto } from './dto/update-detalles-venta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Detalles ventas')
@Controller('detalles-ventas')
export class DetallesVentasController {
  constructor(private readonly detallesVentasService: DetallesVentasService) {}

  @Post()
  create(@Body() createDetallesVentaDto: CreateDetallesVentaDto) {
    return this.detallesVentasService.create(createDetallesVentaDto);
  }

  @Get()
  findAll() {
    return this.detallesVentasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesVentasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetallesVentaDto: UpdateDetallesVentaDto,
  ) {
    return this.detallesVentasService.update(+id, updateDetallesVentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesVentasService.remove(+id);
  }
}
