describe('Network Server Error', () => {
  it('should show server is down if unable to fetch data', () => {
    cy.intercept('GET', 'https://developer.nps.gov/api/v1/parks?api_key=KgfnACP2f09gBqEMUsNGRWvjNFxJkQPuXT9kVb0w', {
      statusCode: 500,  
    }).as('HomeErrorpage')
    cy.visit('http://localhost:3000/')
    cy.wait('@HomeErrorpage')
    cy.get("[data-test='error-message']").contains('Server is down, please try again later.')
  })
})

describe('Network 404 Error', () => {
  it('should test for 404 network error', () => {
    cy.intercept('GET', 'https://developer.nps.gov/api/v1/parks?api_key=KgfnACP2f09gBqEMUsNGRWvjNFxJkQPuXT9kVb0w', {
      statusCode: 404,  
    }).as('NotFound');

    cy.visit('http://localhost:3000/parks/Abra0Lincoln/i')
    cy.get(".not-found-container").contains('p', `404 Page Not Found: The page you are looking for doesn't exist.`);
  })
})


