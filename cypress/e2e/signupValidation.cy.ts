describe('Signup Validation Test', () => {
  it('should validate input fields before signing up', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Create a free account').click()
    // Check that there are no missing fields
    cy.get('#create-account').click()
    cy.get('.error').should('contain.html', 'Please fill out missing fields.')
    cy.get('input[type=text]').type('Test')
    cy.get('input[type=email]').type('test')
    cy.get('input[type=password]').type('test123')
    // Check that email address is valid
    cy.get('#create-account').click()
    cy.get('.error').should(
      'contain.html',
      'Please enter a valid email address.',
    )
    cy.get('[type="text"]').clear()
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    // Check that password is strong enough
    cy.get('input[type=text]').type('Test')
    cy.get('input[type=email]').type('test@google.com')
    cy.get('input[type=password]').type('test')
    cy.get('#create-account').click()
    cy.get('.error').should('contain.html', 'Please enter a stronger password.')
  })
})
