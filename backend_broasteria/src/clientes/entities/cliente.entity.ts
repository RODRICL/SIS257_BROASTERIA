import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar',{length:30,nullable:false}) 
    nombres:string;

    @Column('varchar',{length:30,nullable:false})
    apellido_paterno:string;

    @Column('varchar',{length:30,nullable:false})
    apellido_materno:string;

    @Column('varchar',{length:8,nullable:false})
    telefono:string;

    @Column('varchar',{length:50,nullable:false})
    direccion:string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;
}
