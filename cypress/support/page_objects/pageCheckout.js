class pageCheckout {

    isOrderVisible(title) {
        cy.contains(title).should('be.visible')
    }

    isFormVisible() {
        const fields = ['name', 'addressLine1', 'addressLine2', 'pincode', 'state']
        fields.forEach((field) => {
            cy.get(`input[formcontrolname="${field}"]`).should('be.visible')
        })
    }

    fillForm(data) {
        cy.get('input[formcontrolname="name"]').type(data.name)
        cy.get('input[formcontrolname="addressLine1"]').type(data.address1)
        cy.get('input[formcontrolname="addressLine2"]').type(data.address2)
        cy.get('input[formcontrolname="pincode"]').type(data.pincode)
        cy.get('input[formcontrolname="state"]').type(data.state)
    }

    clickPlaceOrderButton() {
        cy.contains('button', 'Place Order').click()
    }

} module.exports = new pageCheckout();