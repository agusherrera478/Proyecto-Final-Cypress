import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
//A PARTIR DE ACA AGREGE YO AGUSTINA: para completar el caso 1
import checkoutData from '../fixtures/checkout.json'
const pageCart = require('../support/page_objects/pageCart')
const pageCheckout = require('../support/page_objects/pageCheckout')
const pageOrders = require('../support/page_objects/pageOrders')
// AGREGADO POR AUGUSTO MEYER
import book from '../fixtures/bookAugusto.json'
const componentFilter = require('../support/page_objects/componentFilter')
// AGREGADO POR SALOME
import userSalome from '../fixtures/userSalome.json'




describe('Casos de prueba de FRONT', () => {

  it('Comprar carrito exitosamente y visualizar orden de compra', () => {

    cy.deleteCartAPI(user.userId);
    cy.visit(url.login)
    cy.login(user.name, user.password);
    cy.url().should('include', url.home)
    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0')
    pageHome.clickAddToCartButton();
    pageHome.isAddedToCartMessageVisible()
    componentNav.validationNumberCartBadge('1')
    componentNav.clickCartIcon()
//DESDE ACÁ: COMPLETADO POR AGUSTINA (la profe dejó el caso hasta el click en el carrito)
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
// ===== CASO PROPIO: AGUSTINA
    it('Agregar un libro a favoritos y visualizar el contador | Agustina Herrera', () => {

    cy.deleteWishlistAPI(user.userId, user.token)
    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)
    pageHome.isBookVisible()
    componentNav.validationNumberFavoritesBadge('0')
    pageHome.clickAddToFavoritesButton()
    componentNav.validationNumberFavoritesBadge('1')

  })

// ===== CASO PROPIO: AUGUSTO MEYER
  it('Filtrar libros por categoría | Augusto Meyer', () => {

    cy.getAccountAugusto().then((account) => {
      cy.visit(url.login)
      cy.login(account.name, account.password)
    })
    cy.url().should('include', url.home)
    pageHome.isBookVisible()
    componentFilter.clickCategory(book.filtro.category)
    cy.url().should('include', book.filtro.url)
    componentFilter.validationActiveCategory(book.filtro.category)
    componentFilter.validationNumberOfBooks(book.filtro.cantidadLibros)
    componentFilter.isBookVisible(book.filtro.libroIncluido)
    componentFilter.isBookNotVisible(book.filtro.libroExcluido)

  })
// ===== FIN CASO PROPIO: AUGUSTO MEYER

  
  // ===== CASO PROPIO: SALOME NAVARRO BENITEZ
  it('Eliminar un producto individual del carrito de compras | Salome Navarro Benitez', () => {

    cy.visit(url.login)
    cy.login(userSalome.name, userSalome.password);
    cy.deleteCartAPI(userSalome.userID);

    cy.addToCartAPI(userSalome.userID, 4, userSalome.token);
    cy.addToCartAPI(userSalome.userID, 2, userSalome.token);
    cy.wait(1500)

    componentNav.clickCartIcon();

    componentNav.verifyCartBadgeAtLeast(2);
    cy.url().should('include', url.cart)

    pageCart.deleteFirstBook();
    pageCart.verifySuccessToast();

    cy.wait(1500)
    pageCart.verifyCartRowsCount(1);

  })
// ===== FIN CASO PROPIO: SALOME NAVARRO BENITEZ


  it('Título caso de prueba 4 | Nombre Alumno', () => {
  })

  it('Título caso de prueba 5 | Nombre Alumno', () => {
  })

  //it.only ejecutar solo ese caso de prueba
  //it.skip no ejecuta ese caso de prueba
  
})
