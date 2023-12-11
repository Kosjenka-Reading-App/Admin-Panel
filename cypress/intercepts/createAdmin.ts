export const createAdmin = () => {
  cy.intercept("POST", "/admin", {
    statusCode: 200,
    body: {
      id_account: 1,
      email: "",
      account_category: "admin",
    },
  });
};
