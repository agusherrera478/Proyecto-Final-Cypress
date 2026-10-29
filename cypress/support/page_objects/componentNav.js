class componentNav {
    validationNumberCartBadge(cant) {
        cy.get('#mat-badge-content-0').contains(cant).should('be.visible')
    }
     validationNumberFavoritesBadge(cant) {// ===== AGREGADO POR AGUSTINA 
        cy.get('#mat-badge-content-1').contains(cant).should('be.visible')
    }
} 
module.exports = new componentNav(); 