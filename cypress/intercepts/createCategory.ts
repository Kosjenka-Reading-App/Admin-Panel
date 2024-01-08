export const createCategory = (category: string) => {
  cy.intercept("POST", `/categories/${category}`, {
    statusCode: 200,
    body: {
      category: "Satvik",
    },
  }).as("createCategory");
};

export const createCategoryFailed = (category: string) => {
  cy.intercept("POST", `/categories/${category}`, {
    statusCode: 400,
    body: {
      detail: "category already exists",
    },
  }).as("createCategory");
};
