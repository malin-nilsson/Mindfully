import { authUser } from '../fixtures/auth-user'
import '../support/commands.ts'

beforeEach(() => {
  const { email, password } = authUser
  cy.visit('http://localhost:3000')
  cy.login(email, password)
})

afterEach(() => {
  cy.logout()
})

describe('Save/Unsave Favorite Test', () => {
  it('should save and remove favorite meditations', () => {
    // Check that favorite is saved
    cy.contains('Find a Meditation').click()
    cy.contains('Soft Rain').click()
    cy.get('.icon-favorite').click({ force: true })
    cy.get('.icon-close').click({ force: true })
    cy.get('.mobile-menu-icon').click()
    cy.contains('Favorites').click()
    cy.contains('Soft Rain')
    // And removed...
    cy.get('.mobile-menu-icon').click()
    cy.contains('Explore').click()
    cy.contains('Soft Rain').click()
    cy.wait(1000)
    cy.get('.icon-favorite').click({ force: true })
    cy.wait(1000)
    cy.get('.icon-close').click({ force: true })
    cy.get('.mobile-menu-icon').click()
    cy.contains('My Journey').click()
    cy.contains('Soft Rain').should('not.exist')
  })
})
