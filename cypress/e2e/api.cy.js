import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {

    it('API | Comprar carrito exitosamente', () => {
        cy.postCheckOutAPI(user.userId, user.token, 200)
    })

    it('API | Error al comprar carrito sin token', () => {
        cy.postCheckOutAPI(user.userId, '', 401)
    })

    it.skip('Titulo caso de prueba API 2 | Nombre Alumno', () => {
    })

    it.skip('Titulo caso de prueba API 3 | Nombre Alumno', () => {
    })


})