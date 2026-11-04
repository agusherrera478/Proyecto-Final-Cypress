import user from '../fixtures/user.json'
// AGREGADO POR AUGUSTO MEYER
import book from '../fixtures/bookAugusto.json'
// AGREGADO POR AGUSTINA
import registro from '../fixtures/registro.json'
// AGREGADO POR SALOME
import userSalome from '../fixtures/userSalome.json'


describe('Casos de prueba de APIs', () => {

    it('API | Comprar carrito exitosamente', () => {
        cy.postCheckOutAPI(user.userId, user.token, 200)
    })

    it('API | Error al comprar carrito sin token', () => {
        cy.postCheckOutAPI(user.userId, '', 401)
    })

     // ===== CASOS PROPIOS: AGUSTINA
        it('API | Registrar un usuario nuevo exitosamente | Agustina Herrera', () => {
        cy.postUserAPI({ ...registro, username: `cypress${Date.now()}` }, 200)
    })

    it('API | Error al registrar un usuario con contraseñas que no coinciden | Agustina Herrera', () => {
        cy.postUserAPI({ ...registro, username: `cypress${Date.now()}`, confirmPassword: 'Otra@12345' }, 400)
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

        // ===== CASOS PROPIOS: SALOME NAVARRO BENITEZ
    it('API | Iniciar sesion exitosamente | Salome Navarro Benitez', () => {
        cy.postLoginSalomeAPI(userSalome.name, userSalome.password, 200);
    })

    it('API | Error al iniciar sesion con contraseña incorrecta | Salome Navarro Benitez', () => {
        cy.postLoginSalomeAPI(userSalome.name, 'Navarro12', 401);
    })
    // ===== FIN CASOS PROPIOS: SALOME NAVARRO BENITEZ

})

