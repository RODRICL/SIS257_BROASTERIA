import { Module } from '@nestjs/common';
import { DetallesVentasService } from './detalles-ventas.service';
import { DetallesVentasController } from './detalles-ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesVenta } from './entities/detalles-venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallesVenta])],
  controllers: [DetallesVentasController],
  providers: [DetallesVentasService],
})
export class DetallesVentasModule {}
