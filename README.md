# Prueba técnica Alten
Prueba técnica para trabajo en remoto, a entregar en un máximo de 5 días o cuando la consideren completa.
## Senior Frontend Developer
Realizar una aplicación de un calendario para empleados en base al material adjunto. La prueba deberá estar subida en un repositorio de GitHub.

Tecnologías requeridas:
* React
* CSS (o SASS)

Funcionalidades a implementar:
* Mostrar un listado de empleados a partir del archivo "employees.json" y los días del calendario para cada uno (calendar.json) representado los distintos tipos de días (laborables, festivos y vacaciones).
* Seleccionar, almacenar (usando ``localstorage``) y eliminar los días de vacaciones por empleado haciendo click sobre el día. Los días que tengan la propiedad ``"tipo_id": ""`` vacía serán los únicos editables.
* Actualizar el contador de vacaciones por empleado (situado al lado del nombre) con los días restantes y un máximo de 22.
* _Opcional:_ Optimizar el renderizados y actualización de los días del calendario de forma que, al seleccionar uno, el resto de días del calendario que no tenga que volver a renderizarse por completo. 

![ejemplo](https://user-images.githubusercontent.com/9970356/218339535-b5ef05f4-1821-4a01-8cb1-513da053cf5a.png)
