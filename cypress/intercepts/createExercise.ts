const createExercise = () => {
  cy.intercept("POST", "/exercises", {
    statusCode: 200,
  }).as("createExercise");
};

export { createExercise };
