import { Producto } from 'src/productos/entities/producto.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('inventarios')
export class Inventario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_producto' })
  idProducto: number;

  @Column('integer', { name: 'id_proveedor' })
  idProveedor: number;

  @Column('int', { name: 'cantidad_disponible' })
  cantidadDisponible: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;
  
  @OneToOne(() => Producto, (producto) => producto.inventario)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
  
  @OneToOne(() => Proveedor, (proveedor) => proveedor.inventario)
  @JoinColumn({ name: 'id_proveedor', referencedColumnName: 'id' })
  proveedor: Proveedor;
}
