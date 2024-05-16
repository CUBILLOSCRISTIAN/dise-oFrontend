# Gestión de Datos Personales

## Descripción

Este repositorio contiene una aplicación para la gestión de datos personales. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los registros de datos personales, además de validar y registrar todas las transacciones en un log. La aplicación está diseñada para ser desplegada en contenedores y se estructura mediante microservicios.

## Funcionalidades

### Validaciones Requeridas

1. **Primer Nombre**: 
    - No debe ser un número.
    - No mayor a 30 caracteres.
2. **Segundo Nombre**:
    - No debe ser un número.
    - No mayor a 30 caracteres.
3. **Apellidos**:
    - No debe ser un número.
    - No mayor a 60 caracteres.
4. **Fecha de Nacimiento**:
    - Debe poder escogerse de un calendario o escribirse en formato `dd-mmm`.
5. **Género**:
    - Lista con 4 valores: `Masculino`, `Femenino`, `No binario`, `Prefiero no reportar`.
6. **Correo Electrónico**:
    - Validar formato de correo electrónico.
7. **Celular**:
    - Debe ser un número.
    - Debe tener 10 caracteres.
8. **Número de Documento**:
    - Debe ser un número.
    - No mayor a 10 caracteres.
9. **Tipo de Documento**:
    - Lista con 2 valores: `Tarjeta de identidad`, `Cédula`.
10. **Foto**:
    - El tamaño del archivo no debe superar los 2 MB.

### Otros Requerimientos

1. **Despliegue en Contenedores**:
    - La aplicación debe desplegarse utilizando contenedores.

2. **Funcionalidad CRUD**:
    - Crear, leer, actualizar y eliminar registros.
    - Registrar todas las transacciones en un log.
    - La llave de búsqueda de los registros es el número de documento.

3. **Captura de Campos**:
    - Los campos a capturar son los mostrados en la pantalla principal.

4. **Validaciones**:
    - Realizar todas las validaciones requeridas mencionadas anteriormente.

5. **Microservicios**:
    - Cada opción del menú se desarrollará en un microservicio independiente.
    - La opción de “Consultar” estará en un contenedor independiente al del resto de la aplicación.

6. **Base de Datos**:
    - La base de datos estará en un contenedor independiente al del resto de la aplicación.

7. **Consulta de Log**:
    - Permitir búsqueda por tipo y documento, y por fecha de transacción.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **src/**: Código fuente de la aplicación.
  - **microservicios/**: Contiene los microservicios para cada opción del menú.
  - **validaciones/**: Lógica de validación de datos.
  - **log/**: Módulo de registro de transacciones.
- **docker/**: Configuraciones para el despliegue en contenedores.
- **database/**: Scripts y configuraciones de la base de datos.
- **README.md**: Este archivo.

## Despliegue

Para desplegar la aplicación, siga estos pasos:

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu_usuario/gestion-datos-personales.git
    ```

2. **Navegar al directorio del proyecto**:
    ```bash
    cd gestion-datos-personales
    ```

3. **Construir y ejecutar los contenedores**:
    ```bash
    docker-compose up --build
    ```

## Uso

Una vez desplegada la aplicación, puede acceder a ella a través de la dirección [http://localhost:puerto](http://localhost:puerto). Utilice la interfaz web para gestionar los datos personales, realizando operaciones CRUD y consultando el log de transacciones según sea necesario.

## Contribución

Si desea contribuir al proyecto, por favor siga estos pasos:

1. **Fork el repositorio**.
2. **Cree una nueva rama** para su función (`git checkout -b feature/funcion`).
3. **Realice los cambios** y comités (`git commit -m 'Agregar nueva función'`).
4. **Empuje a la rama** (`git push origin feature/funcion`).
5. **Abra un Pull Request**.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

¡Gracias por utilizar nuestra aplicación para la gestión de datos personales! Si tiene alguna pregunta o sugerencia, no dude en abrir un issue.
