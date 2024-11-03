import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Promociones')
@Controller('promociones')
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Post()
  create(@Body() createPromocioneDto: CreatePromocionDto) {
    return this.promocionesService.create(createPromocioneDto);
  }

  @Get()
  findAll() {
    return this.promocionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promocionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromocioneDto: UpdatePromocionDto,
  ) {
    return this.promocionesService.update(+id, updatePromocioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promocionesService.remove(+id);
  }
}
