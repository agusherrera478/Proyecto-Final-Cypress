import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
import checkoutData from '../fixtures/checkout.json'
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
const pageCart = require('../support/page_objects/pageCart')
const pageCheckout = require('../support/page_objects/pageCheckout')
const pageOrders = require('../support/page_objects/pageOrders')


describe('Casos de prueba de FRONT', () => {

  it.only('Comprar carrito exitosamente y visualizar orden de compra', () => {

    cy.deleteCartAPI(user.userId);
    cy.visit(url.login)
    cy.login(user.name, user.password);
    cy.url().should('include', url.home)
    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0')
    pageHome.clickAddToCartButton();
    cy.contains('One Item added to cart').should('be.visible')
    componentNav.validationNumberCartBadge('1')
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()

    pageCart.isBookTitleVisible('Harry Potter and the Chamber of Secrets')
    pageCart.clickCheckoutButton()
    cy.url().should('include', url.checkout)
    pageCheckout.isOrderVisible('Harry Potter and the Chamber of Secrets')
    pageCheckout.isFormVisible()
    pageCheckout.fillForm(checkoutData)
    pageCheckout.clickPlaceOrderButton()
    cy.url().should('include', url.orders)
    pageOrders.clickFirstOrder()
    pageOrders.isOrderVisible('Harry Potter and the Chamber of Secrets')

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