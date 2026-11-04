# Proyecto Final Cypress Grupo 5

Pruebas automatizadas con Cypress sobre https://app.bookdb.online. El detalle de cada caso está en [`casosdeprueba.md`](casosdeprueba.md).

## Cambios sobre el código de la profe

**Tests**

- `cypress/e2e/front.cy.js`: se completó el caso 1 (desde el carrito hasta ver la orden) y se agregaron los casos 6, 9 y 12.
- `cypress/e2e/api.cy.js`: se agregaron los casos 4, 5, 7, 8, 10 y 11.

**Comandos** (`cypress/support/commands.js`)

- `deleteCartAPI`: ahora envía el token de `user.json` (antes iba vacío).
- Nuevos: `deleteWishlistAPI`, `postUserAPI`, `getBookAPI`, `postLoginAPI`, `getAccountAugusto`, `addToCartAPI` y `postLoginSalomeAPI`.

**Page objects** (`cypress/support/page_objects/`)

- Nuevos: `pageCart.js`, `pageCheckout.js`, `pageOrders.js` y `componentFilter.js`.
- `pageHome.js`: se agregó `clickAddToFavoritesButton` y se movió acá `isAddedToCartMessageVisible`, que antes estaba suelto en el caso 1.
- `componentNav.js`: se agregó `validationNumberFavoritesBadge` y se movió acá `clickCartIcon`, que antes estaba suelto en el caso 1. También se agregaron `cartBadge` y `verifyCartBadgeAtLeast`.
- `pageCart.js`: se agregaron `cartRows`, `deleteFirstBook`, `verifySuccessToast` y `verifyCartRowsCount`.

**Fixtures** (`cypress/fixtures/`)

- `user.json`: datos de una cuenta propia.
- `url.json`: se agregaron las claves `checkout`, `orders` y `cart`.
- Nuevos: `checkout.json` (datos del formulario de compra), `registro.json` (datos base para registrar un usuario) ,`bookAugusto.json` (datos de libros y del filtro) `userAugusto.json` (cuenta principal y de respaldo) y `userSalome.json` (cuenta de Salomé).

**Documentación**

- Nuevo: `casosdeprueba.md`, con todos los casos de prueba.
  
## Casos de prueba

1. **Comprar carrito exitosamente y visualizar orden de compra** (profesora): compra un libro desde la web y verifica que la orden aparezca en "My Orders".
2. **API | Comprar carrito exitosamente** (profesora): hace la compra del carrito por API con token y espera un 200.
3. **API | Error al comprar carrito sin token** (profesora): intenta comprar por API sin token y espera un 401.
4. **API | Registrar un usuario nuevo exitosamente** (Agustina Herrera): registra un usuario con datos válidos y un nombre de usuario único, y espera un 200.
5. **API | Error al registrar un usuario con contraseñas que no coinciden** (Agustina Herrera): intenta registrar un usuario con la confirmación de contraseña distinta y espera un 400.
6. **Agregar un libro a favoritos y visualizar el contador** (Agustina Herrera): marca un libro como favorito y verifica que el contador pase de 0 a 1.
7. **API | Obtener un libro por id exitosamente** (Augusto Meyer): pide el libro con id 2 y verifica el código 200 y sus datos (título, autor, categoría y precio).
8. **API | Error al obtener un libro con id inexistente** (Augusto Meyer): pide un libro con un id que no existe y espera un 404.
9. **Filtrar libros por categoría** (Augusto Meyer): filtra por "Mystery" y verifica que solo se muestren los 8 libros de esa categoría.
10. **API | Iniciar sesión exitosamente** (Salomé Navarro Benítez): hace login por API con usuario y contraseña válidos y espera un 200.
11. **API | Error al iniciar sesión con contraseña incorrecta** (Salomé Navarro Benítez): hace login por API con una contraseña incorrecta y espera un 401.
12. **Eliminar un producto individual del carrito de compras** (Salomé Navarro Benítez): agrega 2 libros al carrito por API, elimina el primero desde la web y verifica que quede 1.
