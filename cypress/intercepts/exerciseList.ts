const exerciseList = () => {
    cy.intercept('GET', '/api/exercises', { fixture: 'exerciseList.json' })
        .as('exerciseList');
}
export { exerciseList };
