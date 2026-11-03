import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {

    it('API | Comprar carrito exitosamente', () => {
        cy.postCheckOutAPI(user.userId, user.token, 200)
    })

    it('API | Error al comprar carrito sin token', () => {
        cy.postCheckOutAPI(user.userId, '', 401)
    })

     // ===== CASOS PROPIOS: AGUSTINA
    it('API | Obtener órdenes de compra exitosamente | Agustina Herrera', () => {
        cy.getOrdersAPI(user.userId, user.token, 200)
    })

    it('API | Error al obtener órdenes de compra sin token | Agustina Herrera', () => {
        cy.getOrdersAPI(user.userId, '', 401)
    })
    // ===== FIN CASOS PROPIOS: AGUSTINA

})