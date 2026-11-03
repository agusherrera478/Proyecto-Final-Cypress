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

    
    // ===== CASOS PROPIOS: AUGUSTO MEYER
    it('API | Obtener un libro por id exitosamente | Augusto Meyer', () => {
        cy.getBookAPI(book.existente.bookId, 200).then((response) => {
            expect(response.body.bookId).to.eq(book.existente.bookId)
            expect(response.body.title).to.eq(book.existente.title)
            expect(response.body.author).to.eq(book.existente.author)
            expect(response.body.category).to.eq(book.existente.category)
            expect(response.body.price).to.eq(book.existente.price)
        })
    })

    it('API | Error al obtener un libro con id inexistente | Augusto Meyer', () => {
        cy.getBookAPI(book.inexistente.bookId, 404)
    })
    // ===== FIN CASOS PROPIOS: AUGUSTO MEYER

})

