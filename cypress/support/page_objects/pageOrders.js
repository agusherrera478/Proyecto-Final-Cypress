// ARCHIVO CREADO POR AGUSTINA HERRERA (no es parte de los archivos de la profe)
// Se usa para completar el caso 1 de FE
class pageOrders {

    clickFirstOrder() {
        cy.get('tbody tr').first().click()
    }

    isOrderVisible(title) {
        cy.contains(title).should('be.visible')
    }

} module.exports = new pageOrders();