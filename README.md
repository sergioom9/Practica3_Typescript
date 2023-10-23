# Practica2_Typescript
Práctica de Arquitectura y Programación de Sistemas en Internet


Deno Deploy:
[Deno Deploy](https://www.google.com)


## EndPoints

### GET

- Obtener todos los discos existentes
  `/getDiscos`

- Obtener un disco mediante id
  `/getDiscosbyId/:id`

- Obtener listado de discos según nombre
  `/getDiscosbyName/:nombre`

- Obtener listado de discos según formato
  `/getDiscosbyFormat/:formato`

- Obtener listado de discos según país de impresión
  `/getDiscosbyCountry/:pais`

### DELETE

- Eliminar un Disco por su ID
  `/deleteDisco/:id`

### POST

- Crear un Disco
  `/addDisco`

  Formato del Body:
  ```json
  {
    "nombre": "NombreDisco",
    "autor": "NombreAutor",
    "formato": "Formato",
    "matriz": "Matriz(opcional)",
    "pais_impresion": "País",
    "Arte": "Tipo Arte"
  }

### PUT
- Actualizar un Disco por su ID
    `/updateDisco/:id`


