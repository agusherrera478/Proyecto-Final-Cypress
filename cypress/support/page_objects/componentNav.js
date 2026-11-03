class componentNav {
    validationNumberCartBadge(cant) {
        cy.get('#mat-badge-content-0').contains(cant).should('be.visible')
    }
     validationNumberFavoritesBadge(cant) {// ===== AGREGADO POR AGUSTINA 
        cy.get('#mat-badge-content-1').contains(cant).should('be.visible')
    }
    clickCartIcon() {// ===== REFACTOR POM: antes estaba suelto en el caso 1 de front.cy.js
        cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()
    }
} 
module.exports = new componentNav(); 
