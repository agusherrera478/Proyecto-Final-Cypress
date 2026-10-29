class pageCart {

    isBookTitleVisible(title) {
        cy.contains(title).should('be.visible')
    }

    clickCheckoutButton() {
        cy.contains('button', 'CheckOut').click()
    }

} module.exports = new pageCart();