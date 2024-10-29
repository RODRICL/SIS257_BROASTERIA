import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 30 })
  nombre: string; 

  @Column('varchar', { length: 250 })
  descripcion: string;
}
