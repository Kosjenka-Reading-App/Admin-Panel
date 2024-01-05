export const createCategory = (category:string) => {
  
  cy.intercept("POST", `/categories/${category}`, {
    statusCode: 200,
    body: {
      category: "Satvik",
    },
  }).as("createCategory");
};