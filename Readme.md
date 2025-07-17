# 📦 HC interview

## 🧾 Tabla de Contenido

- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)

---

## 🧰 Tecnologías

- Lenguaje: `Node.js`, `typescript`.
- Framework: `Express`.
- Base de datos: `Mysql`, `TypeORM`.
- Otros: `Docker` etc.

## 🚀 Instalación

Si quieres ejecutar las bases de datos de forma local

```bash
make run-database-local
```

Si quieres remover las bases de datos de forma local

```bash
make down-database-local
```

Si quieres ejecutar las bases de datos de forma local para tests

```bash
make run-database-test
```

Si quieres remover las bases de datos de forma local para tests

```bash
make down-database-test
```

estos comandos permiten ejecutar las bases de datos en modo local y en modo test.

Para instalar las dependencias

```bash
git clone https://github.com/usuario/proyecto.git
cd proyecto
npm install
npm run start:dev:pretty
```

## 📦 Estructura del Proyecto

El proyecto es una api la cual su arquitectura esta basada en clean architecture.
Esta pensada en una arquitectura hexagonal
