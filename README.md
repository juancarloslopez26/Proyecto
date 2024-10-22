# Proyecto
# ProyectoFinalApiFifa
FIFA Stats API
Esta es una API REST para gestionar las estadísticas de jugadores de fútbol, con operaciones CRUD para los registros de los jugadores. Incluye una documentación interactiva de la API utilizando Swagger, así como una gestión eficiente de errores y respuestas HTTP.

Requisitos
Docker
Docker Compose
Node.js
Puerto 4001 libre
Para la instalación de los requisitos
Instalar Node.js desde su página oficial: Node.js

Instalar Docker y Docker Compose desde su página oficial: Docker

Para la instalación de la API
Clona este repositorio en el directorio de tu preferencia:

bash
Copiar código
git clone https://github.com/tu-usuario/FifaStatsApi.git
Cambia al directorio del proyecto:

bash
Copiar código
cd FifaStatsApi
Instala las dependencias de Node.js:

bash
Copiar código
npm install
Construye y levanta los contenedores usando Docker Compose:

bash
Copiar código
docker-compose build
docker-compose up -d
Uso
Una vez que los contenedores estén en marcha (app y db), la API estará disponible en:

arduino
Copiar código
http://localhost:4001
Para verificar los endpoints y la documentación de Swagger, ingresa a:

bash
Copiar código
http://localhost:4001/api-docs
Para detener los contenedores
Para detener los contenedores, utiliza el siguiente comando:

bash
Copiar código
docker-compose down
Para detener los contenedores, borrar el volumen utilizado y eliminar la imagen construida localmente:

bash
Copiar código
docker-compose down --rmi local -v
# ProyectoFinalApiFifa
