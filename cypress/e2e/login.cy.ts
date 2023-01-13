import { authUser } from '../fixtures/auth-user'
import '../support/commands.ts'

describe('Login test', () => {
  it('should log in with email and password', () => {
    const { email, password } = authUser
    cy.visit('http://localhost:3000') // Visit login page
    cy.contains('Log in').click()
    cy.get('input[type=email]').type(email)
    cy.get('input[type=password]').type(password)
    cy.get('#login-btn').click()
    cy.get('.mobile-menu-icon').click()
    cy.contains('Profile').click()
    cy.get('input[type=email]').should('have.value', email)
    cy.logout()
  })
})
