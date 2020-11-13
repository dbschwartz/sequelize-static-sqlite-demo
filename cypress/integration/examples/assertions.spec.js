/// <reference types="cypress" />

context('Assertions', () => {
  let response;
  beforeEach(() => {
    cy.request({url: 'http://localhost:8080/movies?page=a', failOnStatusCode: false})
    .then( res => {
      // response.body is automatically serialized into JSON
      response = res;
    })
  })

  describe('Implicit Assertions', () => {
    it('.should() - make an assertion about the current subject', () => {
      // https://on.cypress.io/should
      expect(response.body).to.have.property('error', 500) 
      expect(response.body).to.have.property('message', 'Internal Server Error, please contact Tech Support') 
    })
  })
})
