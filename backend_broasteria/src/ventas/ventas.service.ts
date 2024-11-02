import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
  ) {}
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const existe = await this.ventasRepository.findOneBy({
      fechaVenta: createVentaDto.fechaVenta,
      idCliente: createVentaDto.idCliente,
      total: createVentaDto.total,
    });

    if (existe) throw new ConflictException('La venta ya existe');

    const venta = new Venta();
    venta.idCliente = createVentaDto.idCliente;
    venta.fechaVenta = createVentaDto.fechaVenta;
    venta.total = createVentaDto.total;
    return this.ventasRepository.save(venta);
  }

  async findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({
      relations: ['cliente'],
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
    if (!venta) throw new NotFoundException('La venta no existe');
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.ventasRepository.findOneBy({ id });
    if (!venta) throw new NotFoundException('La venta no existe');

    const ventaUpdate = Object.assign(venta, updateVentaDto);
    return this.ventasRepository.save(ventaUpdate);
  }

  async remove(id: number) {
    const venta = await this.ventasRepository.findOneBy({ id });
    if (!venta) throw new NotFoundException('La venta no existe');
    return this.ventasRepository.softRemove(venta);
  }
}
