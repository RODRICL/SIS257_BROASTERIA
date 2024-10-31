import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private clientesRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const existe = await this.clientesRepository.findOneBy({
      nombres: createClienteDto.nombres.trim(),
    });

    if (existe) throw new ConflictException('Ya existe el cliente');

    const cliente = new Cliente();
    cliente.nombres = createClienteDto.nombres.trim();
    cliente.apellidoPaterno = createClienteDto.apellido_paterno.trim();
    cliente.apellidoMaterno = createClienteDto.apellido_materno.trim();
    cliente.telefono = createClienteDto.telefono.trim();
    cliente.direccion = createClienteDto.direccion.trim();

    return this.clientesRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clientesRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ id });
    if (!cliente) throw new NotFoundException('La categoria no existe');
    return cliente;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.findOne(id);
    const actualizaCliente = Object.assign(cliente, updateClienteDto);
    return this, this.clientesRepository.save(actualizaCliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    return this.clientesRepository.softRemove(cliente);
  }
}
