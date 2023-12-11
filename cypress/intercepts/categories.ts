export const listCategories = () => {
  cy.intercept("GET", "/categories?page=1&size=100&name_like=", {
    statusCode: 200,
    body: {
      items: [
        {
          category: "category",
        },
      ],
    },
  });
};
