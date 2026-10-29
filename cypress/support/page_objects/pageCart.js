class pageCart {
    clickCheckOutButton() {
        cy.get('button').contains('CheckOut').click();
    }

    fillCheckoutForm(name, address1, address2, pincode, state) {
        cy.get('input[formcontrolname="name"]').type(name);
        cy.get('input[formcontrolname="addressLine1"]').type(address1);
        cy.get('input[formcontrolname="addressLine2"]').type(address2);
        cy.get('input[formcontrolname="pincode"]').type(pincode);
        cy.get('input[formcontrolname="state"]').type(state);
    }

    clickPlaceOrderButton() {
        cy.get('button').contains('Place Order').click();
    }

    clickFirstOrder() {
        cy.get('table tbody tr').first().click();
    }

    validationOrderVisible() {
        cy.contains('Amount Paid').should('be.visible');
    }
} 
module.exports = new pageCart();