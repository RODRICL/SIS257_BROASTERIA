# SIS257_BROASTERIA
Bienvenidos a "El Sabor del Pollo", donde en cada bocado resalta el sabor en nuestro pollo, hamburguesas, papas fritas y otros.
Utilizamos solo los ingredientes más frescos, garantizando un sabor único y una textura crujiente que te hará volver por más.

En "El Sabor del Pollo". Nuestro menú incluye no solo pollo broaster, sino también una variedad de deliciosos acompañamientos,
como papas fritas crujientes.

Ya sea que vengas con la familia, con amigos o simplemente desees un almuerzo rápido, nuestro ambiente acogedor y un servicio al cliente excepcional
te harán sentir como en casa.

"El Sabor del Pollo" es la elección preferida de quienes buscan calidad, sabor y una experiencia inolvidable.

TABLAS Y/O ENTIDADES TENTABLES

Clientes( id, nombre(30), apellido_paterno(30), apellido_materno(30), telefono(8), direccion(250)) 

Ventas( id, id_cliente, fecha_venta, total(5,2)) 

Detalles_Venta( id, id_venta, id_producto, cantidad) 

Productos( id, nombre(30), descripcion(250),cantidad_disponible, precio(3,2), id_categoria) 

Categorias( id, nombre(30), descripcion(250)) 

Proveedores( id, id_producto, nombre(30), apellido_paterno(30), telefono(8), direccion(250)) 

Empleados(id, nombre(30), apellido_paterno(30), apellido_materno(30), cargo(40), telefono(8), salario) 

Usuario(id, id_empleado, nombre_usuario(30), clave(250))

Pagos( id, id_venta, monto(5,2), fecha_pago, metodo_pago) 

Promociones( id, nombre(30), descripcion(250), fecha_inicio, fecha_fin, id_producto) 