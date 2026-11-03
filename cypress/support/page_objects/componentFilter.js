// ARCHIVO CREADO POR AUGUSTO MEYER (caso propio de FE: filtrar libros por categoría)

class componentFilter {

    clickCategory(category) {
        cy.contains('app-book-filter mat-list-item', category).click()
    }

    validationActiveCategory(category) {
        // La categoría elegida queda marcada con la clase active-category
        cy.get('app-book-filter .active-category').should('contain', category)
    }

    validationNumberOfBooks(cant) {
        cy.get('app-book-card').should('have.length', cant)
    }

    isBookVisible(title) {
        cy.contains('app-book-card', title).should('be.visible')
    }

    isBookNotVisible(title) {
        cy.contains('app-book-card', title).should('not.exist')
    }

}
module.exports = new componentFilter();
