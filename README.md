Prueba tecnica que contiene :

Next.js (versión 14 o superior)
TypeScript
React Hooks
Context API para manejo de estado
CSS Modules (recomendado) o CSS puro (archivos .css tradicionales)

Requisitos Técnicos
Tecnologías obligatorias
Next.js (versión 14 o superior)

TypeScript
React Hooks
Context para manejo de estado
CSS Modules
Opcionales (valorarán como plus)
NextAuth.js para autenticación
Testing con Jest o React Testing Library
Componentes accesibles

Especificaciones

1.⁠ ⁠Página de Login

- Formulario con campos: email y contraseña
- Validación de campos (email válido, contraseña mínimo 6 caracteres)
- Mock de autenticación (no necesita backend real, puede usar un mock)
- Manejo de errores (credenciales incorrectas)
- Redirección al dashboard tras login exitoso

2.⁠ ⁠Dashboard Protegido

- Ruta protegida (/dashboard)
- Si usuario no autenticado, redirigir a login
- Mostrar email del usuario logueado
- Botón de logout

3.⁠ ⁠Listado de Datos (30 puntos)

- Consumir la API pública JSONPlaceholder o similar
- Mostrar listado de posts con: id, título y cuerpo
- Paginación o scroll infinito
- Loading states mientras carga
- Manejo de errores si falla la API

4.⁠ ⁠Sistema de Filtrado (30 puntos)

- Input de búsqueda por texto (filtra título y cuerpo)
- Select para filtrar por userId (si la API lo permite)
- Botón para resetear filtros
- Los filtros deben persistir al cambiar entre páginas
- Mostrar mensaje cuando no hay resultados

Entrega

- Código en repositorio Git (GitHub, GitLab, etc.)
- README.md con:
- Instrucciones para ejecutar el proyecto
- Decisiones técnicas tomadas
- Dificultades encontradas
- Tiempo invertido (opcional)

Criterios de Evaluación

- Correcto funcionamiento
- Calidad de código (estructura, legibilidad, patrones)
- Manejo de estados y efectos
- Experiencia de usuario (loading, errores, etc.)
- Responsive design

API Sugerida
Puedes usar cualquiera de estas APIs públicas:

JSONPlaceholder (https://jsonplaceholder.typicode.com/)
PokeAPI (https://pokeapi.co/)
Rick and Morty API (https://rickandmortyapi.com/)
