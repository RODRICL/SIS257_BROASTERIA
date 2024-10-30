import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30, nullable: false })
  nombres: string;

  @Column('varchar', { length: 30, nullable: false, name: 'apellido_paterno'})
  apellidoPaterno: string;

  @Column('varchar', { length: 30, nullable: false, name: 'apellido_materno' })
  apellidoMaterno: string;

  @Column('varchar', { length: 8, nullable: false })
  telefono: string;

  @Column('varchar', { length: 250, nullable: false })
  direccion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;
}
