import { authUser } from '../fixtures/auth-user'
import '../support/commands.ts'

describe('Save Favorite Test', () => {
  it('should save favorite meditation', () => {
    const { email, password } = authUser
    cy.visit('http://localhost:3000')
    cy.login(email, password)
    cy.contains('Find a Meditation').click()
    cy.contains('Soft Rain').click()
    cy.get('.icon-favorite').click({ force: true })
    cy.get('.icon-close').click({ force: true })
    cy.get('.mobile-menu-icon').click()
    cy.contains('Favorites').click()
    cy.contains('Soft Rain')
    cy.logout()
  })
})
