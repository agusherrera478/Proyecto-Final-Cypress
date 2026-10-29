class componentNav {
    validationNumberCartBadge(cant) {
        cy.get('#mat-badge-content-0').contains(cant).should('be.visible')
    }
} 
module.exports = new componentNav(); 