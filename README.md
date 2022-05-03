# CoffeeClicker

Desplegar en local:

cd cookies-app

ng serve -o

Tests Unitarios:

ng test


Funcionamiento:

En la vista home se deberá rellenar un campo con un nombre de usuario de al menos 5 caracteres, al pulsar "submit" comenzará el juego.

La vista game contiene el contador de clicks (Sells) donde cada click corresponde a una venta. Podemos pulsar el botón con forma de café para aumentar en 1 las ventas.

Encontraremos 3 botones de mejora:

- Sells: aumenta el numero de ventas por click y se muestra el multiplicador como nivel (Lvl 2 = clicks * 2).
- Press: Añadir un nuevo auto clicker. Límite: 13.
- Machine: Añadir un nuevo mega auto clicker por un precio mayor. Límite: 10.

Evento Rush Hour:

Al pulsar el botón de café hay una probabilidad de activar Rush Hour, lo cual multiplica los clicks por 5.
