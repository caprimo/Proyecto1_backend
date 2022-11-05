# Proyecto 1 Backend

## CRUD user

### Leer todos los usuario
http://localhost:5000/users

### Leer un usuario
http://localhost:5000/users/user/:username

### Crear un usuario
http://localhost:5000/users/user/create

### Actualizar un usuario
http://localhost:5000/users/user/update/:username

### Eliminar un usuario
http://localhost:5000/users/user/delete/:username

## CRUD publicaciones/tweets

### Leer todas las publicaciones
http://localhost:5000/publicaciones/tweets/

### Leer las publicaciones de un usuario
http://localhost:5000/publicaciones/tweets/:username

### Crear una publicación
http://localhost:5000/publicaciones/tweets/tweet/create/:username

### Actualizar una publicación
http://localhost:5000/publicaciones/tweets/tweet/update/:id

### Eliminar una publicación
http://localhost:5000/publicaciones/tweets/tweet/delete/:id

## CR-D seguidores

### Leer los seguidos de un usuario
http://localhost:5000/followers/followers/:username

### Leer los seguidores de un usuario
http://localhost:5000/followers/followeds/:username

### Seguir a un usuario
http://localhost:5000/followers/follow

### Dejar de seguir a un usuario
http://localhost:5000/followers/user/:username

## CR-D de Likes

### Dar like
http://localhost:5000/likes/user/:username/like

### Leer post que le diste likes
http://localhost:5000/likes/user/:username/likes

### Eliminar un like a una publicación
http://localhost:5000/likes/user/:username/delete

## Read timeline

### Ver el timeline de un usuario
http://localhost:5000/timeline/:username




