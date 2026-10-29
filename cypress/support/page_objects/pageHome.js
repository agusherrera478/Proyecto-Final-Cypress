class pageHome {
    isBookVisible() {
        cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    }

    clickAddToCartButton() {
        cy.get('button').contains('Add to Cart').click()
    }
} 
module.exports = new pageHome();