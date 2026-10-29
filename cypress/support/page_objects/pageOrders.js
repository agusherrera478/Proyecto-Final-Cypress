class pageOrders {

    clickFirstOrder() {
        cy.get('tbody tr').first().click()
    }

    isOrderVisible(title) {
        cy.contains(title).should('be.visible')
    }

} module.exports = new pageOrders();