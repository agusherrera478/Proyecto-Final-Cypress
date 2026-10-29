import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
const pageCart = require('../support/page_objects/pageCart')

describe('Casos de prueba de FRONT', () => {

  it.only('Comprar carrito exitosamente y visualizar orden de compra', () => {

    // 1. Vaciamos el carrito por API para que arranque en 0
    cy.deleteCartAPI(user.userId);

    // 2. Visitamos el login e iniciamos sesión
    cy.visit(url.login);
    cy.login(user.name, user.password);
    cy.url().should('include', url.home);

    // 3. Verificamos home y que el badge del carrito muestre 0
    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0');

    // 4. Agregamos el libro y chequeamos que el badge cambie a 1
    pageHome.clickAddToCartButton();
    cy.contains('One Item added to cart').should('be.visible');
    componentNav.validationNumberCartBadge('1');

    // 5. Clic en el icono del carrito
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click();

    // 6. Clic en CheckOut
    pageCart.clickCheckOutButton();
    cy.url().should('include', '/checkout');

    // 7. Completamos los datos de envío
    pageCart.fillCheckoutForm('Agustina Herrera', 'Av. Rivadavia 1234', 'Piso 3 B', '123456', 'Buenos Aires');

    // 8. Clic en Place Order
    pageCart.clickPlaceOrderButton();
    cy.url().should('include', '/myorders');

    // 9. Clic en la primera orden y validamos que se visualice
    pageCart.clickFirstOrder();
    pageCart.validationOrderVisible();

  })

})