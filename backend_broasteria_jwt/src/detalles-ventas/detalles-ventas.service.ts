import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetallesVentaDto } from './dto/create-detalles-venta.dto';
import { UpdateDetallesVentaDto } from './dto/update-detalles-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallesVenta } from './entities/detalles-venta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetallesVentasService {
  constructor(
    @InjectRepository(DetallesVenta)
    private detallesVentasRepository: Repository<DetallesVenta>,
  ) {}
  async create(
    createDetallesVentaDto: CreateDetallesVentaDto,
  ): Promise<DetallesVenta> {
    const existe = await this.detallesVentasRepository.findOneBy({
      idProducto: createDetallesVentaDto.idProducto,
      idVenta: createDetallesVentaDto.idVenta,
      cantidad: createDetallesVentaDto.cantidad,
    });

    if (existe) throw new ConflictException('El detalle de venta ya existe');

    const detallesVenta = new DetallesVenta();
    detallesVenta.idProducto = createDetallesVentaDto.idProducto;
    detallesVenta.idVenta = createDetallesVentaDto.idVenta;
    detallesVenta.cantidad = createDetallesVentaDto.cantidad;
    return this.detallesVentasRepository.save(detallesVenta);
  }

  async findAll(): Promise<DetallesVenta[]> {
    return this.detallesVentasRepository.find({
      relations: ['producto', 'venta'],
    });
  }

  async findOne(id: number): Promise<DetallesVenta> {
    const detallesVenta = await this.detallesVentasRepository.findOne({
      where: { id },
      relations: ['producto', 'venta'],
    });
    if (!detallesVenta)
      throw new NotFoundException('El detalle de la venta no existe');
    return detallesVenta;
  }

  async update(
    id: number,
    updateDetallesVentaDto: UpdateDetallesVentaDto,
  ): Promise<DetallesVenta> {
    const detallesVenta = await this.detallesVentasRepository.findOneBy({ id });
    if (!detallesVenta)
      throw new NotFoundException('El detalle de la venta no existe');

    const detallesVentaUpdate = Object.assign(
      detallesVenta,
      updateDetallesVentaDto,
    );
    return this.detallesVentasRepository.save(detallesVentaUpdate);
  }

  async remove(id: number) {
    const detallesVenta = await this.detallesVentasRepository.findOneBy({ id });
    if (!detallesVenta)
      throw new NotFoundException('El detalle de la venta no existe');
    return this.detallesVentasRepository.softRemove(detallesVenta);
  }
}
