Prueba tecnica

Requerimientos:

Next.js (versión 14 o superior)
TypeScript
React Hooks
Context API para manejo de estado
CSS Modules (recomendado) o CSS puro (archivos .css tradicionales) : Se utilizo CSS Modules

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

API Utilizada

JSONPlaceholder (https://jsonplaceholder.typicode.com/)

Decisiones Técnicas Tomadas

App Router: Se utilizó el nuevo App Router de Next.js para definir las rutas y organizar los componentes dentro de la carpeta app/. Esto permite el uso de Server Components y Client Components.

Componentes Cliente para Hooks: Los componentes que utilizan React Hooks (como useState, useEffect, useContext, y los hooks de next/navigation) se marcaron explícitamente como Componentes Cliente utilizando la directiva 'use client';.

Context API para Autenticación: Se eligió el Context API para gestionar el estado de autenticación de manera global en la aplicación, facilitando el acceso al estado del usuario y las funciones de login/logout en diferentes componentes. El AuthProvider se implementó como un Componente Cliente para poder usar useState y useRouter.

CSS Modules para Estilos: Se utilizaron CSS Modules para encapsular los estilos de cada componente, evitando colisiones de nombres de clases y mejorando la mantenibilidad del CSS.

next/navigation para Redirección: Dentro de los Componentes Cliente en el App Router, se utilizó el hook useRouter de next/navigation para realizar las redirecciones (por ejemplo, tras el login o al intentar acceder a rutas protegidas sin autenticar).

useCallback para Memoización: Se utilizaron useCallback en funciones que se pasan como props a componentes hijos o que se utilizan en arrays de dependencia de useEffect para optimizar el rendimiento al evitar la recreación innecesaria de funciones.

Paginación Infinita con Filtrado: La lógica de paginación infinita se implementó en la página /posts, cargando los posts de la API JSONPlaceholder en lotes y aplicando los filtros (por texto y userId) a los resultados. El estado de la paginación se reinicia al cambiar los filtros.

# Documentación Técnica del Proyecto de Autenticación y Listado de Posts

Este documento proporciona una descripción técnica detallada de la arquitectura, componentes y decisiones de implementación del proyecto de autenticación y listado de posts, construido con Next.js (versión 14.1.0), TypeScript, React Hooks y Context API.

## Arquitectura General

El proyecto sigue una arquitectura basada en componentes de React, utilizando la estructura de directorios del App Router de Next.js para el enrutamiento y la organización del código. El manejo del estado global de autenticación se realiza mediante la Context API de React. La presentación se gestiona con CSS Modules para el encapsulamiento de estilos.

## Componentes Principales

### 1. `app/layout.tsx`

- **Responsabilidad:** Define el layout raíz de la aplicación. Envuelve todos los demás componentes y páginas.
- **Implementación:** Utiliza el componente `AuthProvider` del Context API para proporcionar el estado de autenticación a toda la aplicación.

### 2. `app/page.tsx`

- **Responsabilidad:** Define la página de inicio (`/`).
- **Implementación:** Utiliza el hook `useRouter` de `next/navigation` dentro de un `useEffect` para redirigir al usuario a la página de login (`/login`) al montar el componente. Es un Componente Cliente (`'use client';`).

### 3. `app/login/page.tsx`

- **Responsabilidad:** Implementa la página de inicio de sesión (`/login`).
- **Implementación:**
  - Componente funcional que utiliza `useState` para gestionar los campos del formulario (email y contraseña) y el estado de error.
  - Realiza validaciones básicas del email y la longitud de la contraseña en el envío del formulario.
  - Utiliza el hook `login` del `AuthContext` para intentar autenticar al usuario con un mock de credenciales.
  - Maneja los errores de autenticación mostrando un mensaje al usuario.
  - Tras un inicio de sesión exitoso, utiliza `useRouter` de `next/navigation` para redirigir al `/dashboard`.
  - Es un Componente Cliente (`'use client';`).
  - Los estilos se gestionan con `styles/Login.module.css`.

### 4. `app/dashboard/page.tsx`

- **Responsabilidad:** Implementa la página del dashboard protegida (`/dashboard`).
- **Implementación:**
  - Componente funcional que utiliza el hook `useAuth` para acceder al estado de autenticación (`isAuthenticated` y `user`).
  - Utiliza un `useEffect` para verificar si el usuario está autenticado. Si no lo está, se redirige al `/login` con `useRouter` de `next/navigation`.
  - Muestra el email del usuario logueado y un botón de "Cerrar Sesión" que llama a la función `logout` del `AuthContext`.
  - Es un Componente Cliente (`'use client';`).
  - Los estilos se gestionan con `styles/Dashboard.module.css`.

### 5. `app/posts/page.tsx`

- **Responsabilidad:** Implementa la página que muestra el listado de posts (`/posts`) con paginación infinita y filtrado.
- **Implementación:**
  - Componente funcional que utiliza `useState` para:
    - `posts`: Almacenar la lista de posts cargados.
    - `loading`: Indicar el estado de carga de la API.
    - `error`: Almacenar cualquier error de la API.
    - `page`: Mantener el número de la página actual para la paginación.
    - `hasMore`: Indicar si hay más posts para cargar.
    - `searchTerm`: Almacenar el término de búsqueda del filtro.
    - `userIdFilter`: Almacenar el `userId` seleccionado para el filtro.
  - Utiliza `useCallback` para memoizar las funciones `fetchPosts`, `filterPosts`, `handleFilterChange` y `handleResetFilters`.
  - `useEffect` para:
    - Realizar la carga inicial de posts al montar el componente.
    - Reiniciar el estado de la paginación al cambiar los filtros (`searchTerm`, `userIdFilter`).
    - Implementar la lógica de paginación infinita escuchando el evento `scroll` de la ventana y llamando a `fetchPosts` cuando el usuario se acerca al final de la página.
  - La función `fetchPosts` realiza una petición a la API de JSONPlaceholder (`/posts`) con parámetros de paginación y el `userId` para el filtro (si está presente). Los resultados se filtran localmente por `searchTerm`.
  - El componente `PostList` se utiliza para renderizar la lista de posts.
  - El componente `FilterBar` proporciona la interfaz para el filtrado.
  - Es un Componente Cliente (`'use client';`).
  - Los estilos se gestionan con `styles/Posts.module.css`.

### 6. `app/components/AuthContext.tsx`

- **Responsabilidad:** Define y proporciona el contexto de autenticación.
- **Implementación:**
  - Crea un `AuthContext` utilizando `createContext`.
  - El `AuthProvider` es un componente funcional que gestiona el estado de autenticación (`user`, `isAuthenticated`) utilizando `useState`.
  - Implementa las funciones `login` (con autenticación mock) y `logout` (que limpia el estado y redirige al `/login`).
  - Utiliza `useEffect` para verificar si hay un usuario persistido en `localStorage` al cargar la aplicación.
  - Proporciona el estado y las funciones a través del `AuthContext.Provider`.
  - El hook `useAuth` personalizado facilita el acceso a los valores del contexto en otros componentes.
  - Es un Componente Cliente (`'use client';`) debido al uso de `useState`, `useEffect` y `useRouter`.

### 7. `app/components/PostList.tsx`

- **Responsabilidad:** Renderiza la lista de posts recibida como prop.
- **Implementación:** Componente funcional que recibe un array de objetos `Post` y los renderiza como una lista `<ul>` con elementos `<li>` mostrando el `id`, `title` y `body` de cada post.
- Los estilos se gestionan con `app/components/PostList.module.css`.

### 8. `app/components/FilterBar.tsx`

- **Responsabilidad:** Proporciona la interfaz de usuario para el filtrado de posts.
- **Implementación:**
  - Componente funcional que utiliza `useState` para gestionar los valores del input de búsqueda (`searchTerm`) y el select de `userId` (`userId`).
  - Utiliza `useEffect` para obtener la lista de `userId`s disponibles desde la API de usuarios de JSONPlaceholder para popular el select.
  - Las funciones `handleSearchChange` y `handleUserFilterChange` actualizan el estado local y llaman a la función `onFilter` proporcionada como prop para comunicar los cambios al componente padre (`PostsPage`).
  - La función `handleResetFilters` llama a la función `onReset` proporcionada como prop para limpiar los filtros.
  - Es un Componente Cliente (`'use client';`).
  - Los estilos se gestionan con `app/components/FilterBar.module.css`.

### 9. `styles/`

- Contiene los archivos CSS Modules (`.module.css`) para los diferentes componentes y la hoja de estilos global (`globals.css`).

## Flujo de Datos y Control

1.  **Autenticación:** El estado de autenticación se gestiona centralmente en `AuthContext`. Los componentes `LoginPage` y `DashboardPage` interactúan con este contexto a través del hook `useAuth`.
2.  **Listado y Filtrado de Posts:**
    - El componente `PostsPage` es responsable de obtener los datos de la API y mantener el estado de los posts, la carga y los errores.
    - El componente `FilterBar` permite al usuario interactuar con los filtros y comunica los cambios al `PostsPage` a través de callbacks (`onFilter`, `onReset`).
    - El componente `PostsPage` aplica el filtrado a los datos obtenidos de la API y pasa la lista filtrada al `PostList` para su renderización.
    - La paginación infinita se controla dentro de `PostsPage` mediante el estado `page` y la lógica del evento `scroll`.

## Decisiones de Implementación Clave

- **App Router:** La adopción del App Router influyó en la estructura de las rutas y la necesidad de distinguir entre Server y Client Components.
- **Client Components para Interacción:** Los componentes que requieren interacción del usuario (formularios, botones, scroll, hooks de estado y navegación) se implementaron como Client Components.
- **Context API para Estado Global:** Se prefirió la Context API para la gestión del estado de autenticación debido a su simplicidad para este alcance del proyecto. Para aplicaciones más complejas, una biblioteca de gestión de estado más robusta podría ser considerada.
- **CSS Modules:** El uso de CSS Modules se adoptó para garantizar la modularidad y evitar la contaminación del espacio de nombres de los estilos.
- **Paginación Infinita:** Se implementó la carga progresiva de datos basada en el evento `scroll` para mejorar la experiencia de usuario al cargar grandes conjuntos de datos.
- **Filtrado en el Cliente (Parcialmente):** Debido a las limitaciones de la API JSONPlaceholder, el filtrado por título y cuerpo se realiza en el cliente después de obtener los datos paginados. El filtrado por `userId` se aprovecha en la consulta a la API.

Tiempo Invertido : 4 horas y 30 minutos
