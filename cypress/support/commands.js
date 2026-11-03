const pageLogin = require('../support/page_objects/pageLogin')
// MODIFICADO POR AGUSTINA: se agregó esta línea para poder usar el token en deleteCartAPI
const user = require('../fixtures/user.json') 

Cypress.Commands.add('login', (name, password) => {
    pageLogin.typeUserName(name);
    pageLogin.typeUserPassword(password);
    pageLogin.clickLoginButton();
})

Cypress.Commands.add('deleteCartAPI', (userId) => {
    cy.request({
        method: 'DELETE',
        url: `https://app.bookdb.online/api/shoppingcart/${userId}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            // MODIFICADO POR AGUSTINA: antes era '' (vacío); ahora usa el token de user.json
            authorization: user.token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('postCheckOutAPI', (userId, token, codeResponse) => {
    cy.request({
        method: 'POST',
        url: `https://app.bookdb.online/api/CheckOut/${userId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token,
        },
        body: {
            "orderDetails": [
                {
                    "book": {
                        "bookId": 3,
                        "title": "Harry Potter and the Prisoner of Azkaban",
                        "author": "JKR",
                        "category": "Romance",
                        "price": 213,
                        "coverFileName": "c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg"
                    },
                    "quantity": 1
                }
            ],
            "cartTotal": 213
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })
})
// ===== DESDE ACÁ: AGREGADO POR AGUSTINA
Cypress.Commands.add('deleteWishlistAPI', (userId, token) => {
    const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: token
    }

    // 1) Consulta los favoritos actuales del usuario
    cy.request({
        method: 'GET',
        url: `https://app.bookdb.online/api/Wishlist/${userId}`,
        headers: headers
    }).then((response) => {
        // 2) Quita cada favorito (el endpoint ToggleWishlist agrega o quita según el estado)
        response.body.forEach((book) => {
            cy.request({
                method: 'POST',
                url: `https://app.bookdb.online/api/Wishlist/ToggleWishlist/${userId}/${book.bookId}`,
                headers: headers
            }).then((toggleResponse) => {
                expect(toggleResponse.status).to.eq(200)
            })
        })
    })
})

Cypress.Commands.add('getOrdersAPI', (userId, token, codeResponse) => {
    cy.request({
        method: 'GET',
        url: `https://app.bookdb.online/api/Order/${userId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })
})
// ===== FIN AGREGADO POR AGUSTINA
// ===== DESDE ACÁ: AGREGADO POR AUGUSTO MEYER
// GET /api/Book/{id}: no necesita token. Verifica el código y devuelve la respuesta
// para que el test pueda revisar el body.
Cypress.Commands.add('getBookAPI', (bookId, codeResponse) => {
    cy.request({
        method: 'GET',
        url: `https://app.bookdb.online/api/Book/${bookId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
        return response
    })
})

// POST /api/Login: devuelve la respuesta sin verificar nada (200 si los datos son correctos, 401 si no)
Cypress.Commands.add('postLoginAPI', (name, password) => {
    return cy.request({
        method: 'POST',
        url: 'https://app.bookdb.online/api/Login',
        failOnStatusCode: false,
        body: {
            username: name,
            password: password
        }
    })
})

// Elige qué cuenta de fixtures/userAugusto.json usar: prueba la principal y,
// si el login falla, usa la de respaldo. Devuelve { name, password, token, userId }.
Cypress.Commands.add('getAccountAugusto', () => {
    return cy.fixture('userAugusto').then((accounts) => {
        return cy.postLoginAPI(accounts.principal.name, accounts.principal.password).then((response) => {
            if (response.status === 200) {
                cy.log('Cuenta usada: principal')
                return cy.wrap({ ...accounts.principal, token: response.body.token, userId: response.body.userDetails.userId })
            }
            cy.log(`La cuenta principal falló (${response.status}), se usa la de respaldo`)
            return cy.postLoginAPI(accounts.respaldo.name, accounts.respaldo.password).then((backupResponse) => {
                expect(backupResponse.status, 'login con la cuenta de respaldo').to.eq(200)
                return cy.wrap({ ...accounts.respaldo, token: backupResponse.body.token, userId: backupResponse.body.userDetails.userId })
            })
        })
    })
})
// ===== FIN AGREGADO POR AUGUSTO MEYER
