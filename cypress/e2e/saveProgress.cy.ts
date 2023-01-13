import { authUser } from '../fixtures/auth-user'
import '../support/commands.ts'

describe('Save Progress Test', () => {
  it('should save meditation progress', () => {
    const { email, password } = authUser
    // Log in
    cy.visit('http://localhost:3000')
    cy.login(email, password)
    /* Go to progress page and store session 
    amount so we can use it later */
    cy.get('.mobile-menu-icon').click()
    cy.contains('My Journey').click()
    cy.get('#sessions').then(($sessions) => {
      const oldSessionAmount = parseFloat($sessions.text())

      // Go to meditation page and start a meditation
      cy.get('.mobile-menu-icon').click()
      cy.contains('Explore').click()
      cy.contains('Soft Rain').click()
      cy.get('#meditation-button').click()
      cy.wait(2000)
      cy.get('#meditation-button').click()
      cy.get('.icon-close').click({ force: true })
      // Return to progress page
      cy.get('.mobile-menu-icon').click()
      cy.contains('My Journey').click()
      /* Compare the old session amount with the 
      new one and make sure we get the expected result */
      cy.get('#sessions').then(($sessions) => {
        const newSessionAmount = parseFloat($sessions.text())
        expect(newSessionAmount).to.equal(oldSessionAmount + 1)
      })
    })
    cy.logout()
  })
})
