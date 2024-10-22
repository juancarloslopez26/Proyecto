# Proyecto
# FIFA Stats API

Esta es una API REST para gestionar las estadísticas de jugadores de fútbol, con operaciones CRUD para los registros de los jugadores. La API incluye una documentación interactiva utilizando Swagger y una gestión eficiente de errores y respuestas HTTP.

## Requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/)

Asegúrate de que el puerto **4001** esté libre en tu sistema.

## Instalación

### Instalación de requisitos

1. Instala Node.js desde su [página oficial](https://nodejs.org/).
2. Instala Docker y Docker Compose desde su [página oficial](https://www.docker.com/get-started).

### Instalación de la API

1. Clona este repositorio en el directorio de tu preferencia:

   ```bash
   git clone https://github.com/juancarloslopez26/Proyecto.git

2. Cambia al directorio del proyecto:

   ```bash
   cd Proyecto
3. Instala las dependencias de Node.js:
   ```bash
   npm install
5. Construye y levanta los contenedores usando Docker Compose:
   ```bash
   docker-compose build
   docker-compose up -d
### Uso
1. Para verificar los endpoints y la documentación de Swagger, ingresa a:
   ```bash
   http://localhost:4001/api-docs
### Detener los contenedores
Si deseas detener los contenedores, borrar el volumen utilizado y eliminar la imagen construida localmente, ejecuta:
   ```bash
   docker-compose down --rmi local -v





