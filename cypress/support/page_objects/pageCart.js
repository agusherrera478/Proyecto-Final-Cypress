// ARCHIVO CREADO POR AGUSTINA HERRERA (no es parte de los archivos de la profe)
// Se usa para completar el caso 1 de FE
class pageCart {

    isBookTitleVisible(title) {
        cy.contains(title).should('be.visible')
    }

    clickCheckoutButton() {
        cy.contains('button', 'CheckOut').click()
    }

} module.exports = new pageCart();