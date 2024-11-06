import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario } from './entities/inventario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventariosService {
  constructor(
    @InjectRepository(Inventario)
    private inventariosRepository: Repository<Inventario>,
  ) {}

  async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
    const existe = await this.inventariosRepository.findOneBy({
      idProducto: createInventarioDto.idProducto,
      idProveedor: createInventarioDto.idProveedor,
    });

    if (existe) throw new ConflictException('La canción ya existe');

    const inventario = new Inventario();
    inventario.idProducto = createInventarioDto.idProducto;
    inventario.idProveedor = createInventarioDto.idProveedor;
    inventario.cantidadDisponible = createInventarioDto.cantidadDisponible;
    return this.inventariosRepository.save(inventario);
  }

  async findAll(): Promise<Inventario[]> {
    return this.inventariosRepository.find({
      relations: ['producto', 'proveedor'],
    });
  }

  async findOne(id: number): Promise<Inventario> {
    const inventario = await this.inventariosRepository.findOne({
      where: { id },
      relations: ['producto', 'proveedor'],
    });
    if (!inventario) throw new NotFoundException('La canción no existe');
    return inventario;
  }

  async update(
    id: number,
    updateInventarioDto: UpdateInventarioDto,
  ): Promise<Inventario> {
    const inventario = await this.inventariosRepository.findOneBy({ id });
    if (!inventario) throw new NotFoundException('La canción no existe');

    const inventarioUpdate = Object.assign(inventario, updateInventarioDto);
    return this.inventariosRepository.save(inventarioUpdate);
  }

  async remove(id: number) {
    const inventario = await this.inventariosRepository.findOneBy({ id });
    if (!inventario) throw new NotFoundException('La canción no existe');
    return this.inventariosRepository.softRemove(inventario);
  }
}
