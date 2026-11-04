# Casos de prueba

Documentación de todos los casos de prueba del proyecto, en un solo archivo.

| # | Tipo | Título | Autor | Automatización |
|---|---|---|---|---|
| 1 | FE | Comprar carrito exitosamente y visualizar orden de compra | Profesora | `cypress/e2e/front.cy.js` |
| 2 | API | Comprar carrito exitosamente | Profesora | `cypress/e2e/api.cy.js` |
| 3 | API | Error al comprar carrito sin token | Profesora | `cypress/e2e/api.cy.js` |
| 4 | API | Registrar un usuario nuevo exitosamente | Agustina Herrera | `cypress/e2e/api.cy.js` |
| 5 | API | Error al registrar un usuario con contraseñas que no coinciden | Agustina Herrera | `cypress/e2e/api.cy.js` |
| 6 | FE | Agregar un libro a favoritos y visualizar el contador | Agustina Herrera | `cypress/e2e/front.cy.js` |
| 7 | API | Obtener un libro por id exitosamente | Augusto Meyer | `cypress/e2e/api.cy.js` |
| 8 | API | Error al obtener un libro con id inexistente | Augusto Meyer | `cypress/e2e/api.cy.js` |
| 9 | FE | Filtrar libros por categoría | Augusto Meyer | `cypress/e2e/front.cy.js` |

---

## Caso de prueba 1

> Caso dado por la profesora. Texto original, sin modificaciones.

**Título**: Comprar carrito exitosamente y visualizar orden de compra

**Descripción**: El objetivo de este test es verificar que se pueda comprar un libro y visualizar la orden

**Precondiciones**:

- Tener un usuario registrado que no posea libros en el carrito

| Pasos | Resultado esperado |
|---|---|
| Iniciar sesión en la web https://app.bookdb.online/login | Se redirige al home de la web<br>Se visualiza la lista de libros<br>Se visualiza el icono del carrito con un 0 |
| Click en 'Add to cart' sobre el primer libro de la lista | Se visualiza toast 'One Item added to cart'<br>Se visualiza el icono del carrito con un 1 |
| Click en el icono del carrito | Se visualiza el título del libro correctamente |
| Click en checkout | Se redirige al formulario de compra<br>Se visualiza la orden correctamente<br>Se visualiza el formulario con los campos (name, address 1, address 2, pincode, state) |
| Completar el formulario | |
| Click en Place Order | Se crea la orden de compra correctamente<br>Se redirige a la pantalla de ordenes de compra |
| Click en la primer orden de compra | Se visualiza la compra correctamente |

**Automatización**: `cypress/e2e/front.cy.js` → `it('Comprar carrito exitosamente y visualizar orden de compra')`

> Nota: antes de iniciar sesión, el test vacía el carrito por API (`cy.deleteCartAPI`) para cumplir la precondición. Los datos del formulario salen de `cypress/fixtures/checkout.json`.

---

## Caso de prueba 2

> Caso dado por la profesora. Texto original, sin modificaciones.

**Título**: API | Comprar carrito exitosamente

**Descripción**: El objetivo de este test es verificar que se pueda realizar una compra del carrito exitosamente por API.

**Precondiciones**:

- Tener un UserId de un usuario registrado

| Pasos | Resultado esperado |
|---|---|
| Realizar una solicitud: | Respuesta del Endpoint:<br>200 |

- Método: POST
- URL: https://app.bookdb.online/api/CheckOut/{userId}
- Body:

```json
{
"orderDetails": [
{
"book": {
"bookId": 2,
"title": "Harry Potter and the Chamber of Secrets",
"author": "JKR",
"category": "Mystery",
"price": 236,
"coverFileName": "9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg"
},
"quantity": 1
}
],
"cartTotal": 236
}
```

**Automatización**: `cypress/e2e/api.cy.js` → `it('API | Comprar carrito exitosamente')`

> Nota: el comando `cy.postCheckOutAPI` (`cypress/support/commands.js`) envía en el body el libro con `bookId` 3 ("Harry Potter and the Prisoner of Azkaban", `price` 213, `cartTotal` 213) en lugar del libro 2. El resultado esperado (200) es el mismo.

---

## Caso de prueba 3

> Caso dado por la profesora. Texto original, sin modificaciones.

**Título**: API | Error al comprar carrito sin token

**Descripción**: El objetivo de este test es verificar que el endpoint de compra del carrito valide correctamente la autenticación del usuario y devuelva un error cuando no se proporciona el token JWT Bearer.

**Precondiciones**:

- Tener un UserId de un usuario registrado

| Pasos | Resultado esperado |
|---|---|
| Realizar una solicitud sin enviar token: | Respuesta del Endpoint:<br>Error 401 unauthorized |

- Método: POST
- URL: https://app.bookdb.online/api/CheckOut/{userId}
- Body:

```json
{
"orderDetails": [
{
"book": {
"bookId": 2,
"title": "Harry Potter and the Chamber of Secrets",
"author": "JKR",
"category": "Mystery",
"price": 236,
"coverFileName": "9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg"
},
"quantity": 1
}
],
"cartTotal": 236
}
```

**Automatización**: `cypress/e2e/api.cy.js` → `it('API | Error al comprar carrito sin token')`

> Nota: igual que en el caso 2, la automatización envía el libro con `bookId` 3. El resultado esperado (401) es el mismo.

---

## Caso de prueba 4

**Título**: API | Registrar un usuario nuevo exitosamente | Agustina Herrera

**Descripción**: El objetivo de este test es verificar que se pueda registrar un usuario nuevo por API cuando los datos son válidos.

**Precondiciones**:
- Usar un nombre de usuario que no esté registrado.

**Método**: POST

**URL**: https://app.bookdb.online/api/User

**Body**:
```json
{
  "firstName": "Prueba",
  "lastName": "Cypress",
  "username": "cypress<número único>",
  "password": "Abc@12345",
  "confirmPassword": "Abc@12345",
  "gender": "Female"
}
```

| Pasos | Resultado esperado |
|---|---|
| 1. Enviar el pedido POST a `/api/User` con los datos del body  | El endpoint responde **200** |

**Respuesta del endpoint**: 200

**Automatización**: `cypress/e2e/api.cy.js` → `it('API | Registrar un usuario nuevo exitosamente | Agustina Herrera')` (datos base en `cypress/fixtures/registro.json`)

---

## Caso de prueba 5

**Título**: API | Error al registrar un usuario con contraseñas que no coinciden | Agustina Herrera

**Descripción**: El objetivo de este test es verificar que el endpoint de registro valide los datos y devuelva un error cuando la confirmación de la contraseña no coincide con la contraseña.

**Precondiciones**:
- Usar un nombre de usuario que no esté registrado.

**Método**: POST

**URL**: https://app.bookdb.online/api/User

**Body**:
```json
{
  "firstName": "Prueba",
  "lastName": "Cypress",
  "username": "cypress<número único>",
  "password": "Abc@12345",
  "confirmPassword": "Otra@12345",
  "gender": "Female"
}
```

| Pasos | Resultado esperado |
|---|---|
| 1. Enviar el pedido POST a `/api/User` con `confirmPassword` distinto de `password` | El endpoint responde **400 Bad Request** |

**Respuesta del endpoint**: 400

**Automatización**: `cypress/e2e/api.cy.js` → `it('API | Error al registrar un usuario con contraseñas que no coinciden | Agustina Herrera')` (datos base en `cypress/fixtures/registro.json`)


---

## Caso de prueba 6

**Título**: Agregar un libro a favoritos y visualizar el contador | Agustina Herrera

**Descripción**: El objetivo de este test es verificar que, al marcar un libro como favorito desde el home, el contador de favoritos de la barra superior se actualice.

**Precondiciones**:
- Tener un usuario registrado que no tenga libros en favoritos.

| Pasos | Resultado esperado |
|---|---|
| 1. Iniciar sesión en https://app.bookdb.online/login | Se redirige al home<br>Se visualiza la lista de libros<br>Se visualiza el icono de favoritos con un 0 |
| 2. Hacer clic en el icono de favorito (corazón) del libro "Harry Potter and the Chamber of Secrets" | Se visualiza el icono de favoritos con un 1 |

**Automatización**: `cypress/e2e/front.cy.js` → `it('Agregar un libro a favoritos y visualizar el contador | Agustina Herrera')`

> Nota: antes de iniciar sesión, el test vacía los favoritos por API (`cy.deleteWishlistAPI`: consulta `GET /api/Wishlist/{userId}` y quita cada libro con `POST /api/Wishlist/ToggleWishlist/{userId}/{bookId}`) para cumplir la precondición.

---

## Caso de prueba 7

**Título**: API | Obtener un libro por id exitosamente | Augusto Meyer

**Descripción**: El objetivo de este test es verificar que se puedan obtener por API los datos de un libro existente a partir de su id, y que la respuesta tenga los datos correctos.

**Precondiciones**:
- Que exista un libro con id 2 en https://app.bookdb.online.
- No hace falta token.

**Método**: GET

**URL**: https://app.bookdb.online/api/Book/2

| Pasos | Resultado esperado |
|---|---|
| 1. Enviar el pedido GET a `/api/Book/2` | El endpoint responde **200** |
| 2. Revisar el body de la respuesta | `bookId` = 2, `title` = "Harry Potter and the Chamber of Secrets", `author` = "JKR", `category` = "Mystery", `price` = 236 |

**Respuesta del endpoint**: 200

**Automatización**: `cypress/e2e/api.cy.js` → `it('API | Obtener un libro por id exitosamente | Augusto Meyer')` (datos en `cypress/fixtures/bookAugusto.json`)

---

## Caso de prueba 8

**Título**: API | Error al obtener un libro con id inexistente | Augusto Meyer

**Descripción**: El objetivo de este test es verificar que el endpoint de libros devuelva un error cuando se pide un id que no existe.

**Precondiciones**:
- Que no exista un libro con id 99999.
- No hace falta token.

**Método**: GET

**URL**: https://app.bookdb.online/api/Book/99999

| Pasos | Resultado esperado |
|---|---|
| 1. Enviar el pedido GET a `/api/Book/99999` | El endpoint responde **404 Not Found** |

**Respuesta del endpoint**: 404

**Automatización**: `cypress/e2e/api.cy.js` → `it('API | Error al obtener un libro con id inexistente | Augusto Meyer')`

---

## Caso de prueba 9

**Título**: Filtrar libros por categoría | Augusto Meyer

**Descripción**: El objetivo de este test es verificar que, al elegir una categoría en el filtro del home, se muestren solo los libros de esa categoría.

**Precondiciones**:
- Tener un usuario registrado.

| Pasos | Resultado esperado |
|---|---|
| 1. Iniciar sesión en https://app.bookdb.online/login | Se redirige al home<br>Se visualiza la lista de libros |
| 2. Hacer clic en la categoría "Mystery" del filtro lateral | La URL cambia a `/filter?category=mystery`<br>La categoría "Mystery" queda marcada como activa<br>Se visualizan 8 libros<br>Se visualiza "Harry Potter and the Chamber of Secrets" (categoría Mystery)<br>No se visualiza "Harry Potter and the Prisoner of Azkaban" (categoría Romance) |

**Automatización**: `cypress/e2e/front.cy.js` → `it('Filtrar libros por categoría | Augusto Meyer')` (datos en `cypress/fixtures/bookAugusto.json`)

> Nota: el usuario se obtiene con `cy.getAccountAugusto`, que intenta iniciar sesión por API con la cuenta principal de `cypress/fixtures/userAugusto.json` y, si falla, usa la cuenta de respaldo.
