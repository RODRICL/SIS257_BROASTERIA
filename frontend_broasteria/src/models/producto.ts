import type { Categoria } from './categoria'

export interface Producto {
  id: number

  idCategoria: number

  nombre: string

  descripcion: string

  precioVenta: number

  stock: number

  categoria: Categoria
}
