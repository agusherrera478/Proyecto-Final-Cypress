import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')

describe('Casos de prueba de FRONT', () => {

  it.only('Comprar carrito exitosamente y visualizar orden de compra', () => {

    cy.deleteCartAPI(user.userId);
    cy.visit(url.login)
    cy.login(user.name, user.password);
    cy.url().should('include', url.home)
    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0')
    pageHome.clickAddToCartButton();
    cy.contains('Se ha añadido un artículo al carrito').should('be.visible')
    componentNav.validationNumberCartBadge('1')
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()


  })

  it('Título caso de prueba 2 | Nombre Alumno', () => {
  })

  it('Título caso de prueba 3 | Nombre Alumno', () => {
  })

  it('Título caso de prueba 4 | Nombre Alumno', () => {
  })

  it('Título caso de prueba 5 | Nombre Alumno', () => {
  })

  //it.only ejecutar solo ese caso de prueba
  //it.skip no ejecuta ese caso de prueba
  
})