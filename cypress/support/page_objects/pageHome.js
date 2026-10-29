class pageHome {
    isBookVisible() {
        cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    }

    clickAddToCartButton() {
        cy.get('button').contains('Add to Cart').click()
    }
    clickAddToFavoritesButton() {
        cy.contains('app-book-card', 'Harry Potter and the Chamber of Secrets').contains('favorite').click()
    }
} 
module.exports = new pageHome();