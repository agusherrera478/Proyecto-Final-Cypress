// ARCHIVO CREADO POR AGUSTINA HERRERA (no es parte de los archivos de la profe)
// Se usa para completar el caso 1 de FE
class pageCart {

    isBookTitleVisible(title) {
        cy.contains(title).should('be.visible')
    }

    clickCheckoutButton() {
        cy.contains('button', 'CheckOut').click()
    }

// ===== AGREGADO POR SALOME
    cartRows() {
       return cy.get('tr.mat-mdc-row');
    }
    deleteFirstBook() {
        cy.get('td.mat-column-action button').first().click()
    }
    verifySuccessToast() {
        cy.contains('Book removed from cart').should('be.visible')
    }
    verifyCartRowsCount(expectedCount) {
        this.cartRows().should('have.length', expectedCount);
    }
// ===== FIN AGREGADO POR SALOME

} module.exports = new pageCart();
