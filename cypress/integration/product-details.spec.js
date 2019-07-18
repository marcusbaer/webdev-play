describe('Product Detail Page', () => {

    beforeEach(() => {
        cy.fixture('example').as('example')
    })

    context('rendering', function () {

        it('does not do much!', function () {
            expect(true).to.equal(true)
        })

        it('opens product detail page', function () {

            cy.visit('/')
            cy.title().should('contain', 'Web.Dev')
        })
    })

    // write into console
    // localStorage.debug = 'cypress:*'
})
