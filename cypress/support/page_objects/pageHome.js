class pageHome {
    isBookVisible() {
        cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    }

    clickAddToCartButton() {
        cy.get('button').contains('Add to Cart').click()
    }
    clickAddToFavoritesButton() {// ===== AGREGADO POR AGUSTINA
        cy.contains('app-book-card', 'Harry Potter and the Chamber of Secrets').contains('favorite').click()
    }
    isAddedToCartMessageVisible() {// ===== REFACTOR POM: antes estaba suelto en el caso 1 de front.cy.js
        cy.contains('One Item added to cart').should('be.visible')
    }
} 
module.exports = new pageHome();
