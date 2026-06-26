-- Borrar tablas si ya existen (CASCADE borra las relaciones)
DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Crear Tabla de Usuarios
CREATE TABLE users (
                       id          SERIAL PRIMARY KEY,
                       name        VARCHAR(255) NOT NULL,
                       username    VARCHAR(100) NOT NULL,
                       email       VARCHAR(255) NOT NULL,
                       address_street      VARCHAR(255),
                       address_suite       VARCHAR(100),
                       address_city        VARCHAR(100),
                       address_zipcode     VARCHAR(20),
                       address_geo_lat     DECIMAL(10,7),
                       address_geo_lng     DECIMAL(10,7),
                       phone       VARCHAR(50),
                       website     VARCHAR(255),
                       company_name        VARCHAR(255),
                       company_catch_phrase TEXT,
                       company_bs          VARCHAR(255)
);

-- Crear Tabla de Posts
CREATE TABLE posts (
                       id      SERIAL PRIMARY KEY,
                       user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                       title   TEXT NOT NULL,
                       body    TEXT NOT NULL
);

-- Crear Tabla de Comentarios
CREATE TABLE comments (
                          id      SERIAL PRIMARY KEY,
                          post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
                          name    VARCHAR(255) NOT NULL,
                          email   VARCHAR(255) NOT NULL,
                          body    TEXT NOT NULL
);

-- Crear Tabla de Álbumes
CREATE TABLE albums (
                        id      SERIAL PRIMARY KEY,
                        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                        title   TEXT NOT NULL
);

-- Crear Tabla de Fotos
CREATE TABLE photos (
                        id           SERIAL PRIMARY KEY,
                        album_id     INTEGER NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
                        title        TEXT NOT NULL,
                        url          TEXT NOT NULL,
                        thumbnail_url TEXT NOT NULL
);

-- Crear Tabla de Tareas (Todos)
CREATE TABLE todos (
                       id        SERIAL PRIMARY KEY,
                       user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                       title     TEXT NOT NULL,
                       completed BOOLEAN NOT NULL
);

-- Crear Índices para optimizar las búsquedas por llave foránea
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_albums_user_id ON albums(user_id);
CREATE INDEX idx_photos_album_id ON photos(album_id);
CREATE INDEX idx_todos_user_id ON todos(user_id);