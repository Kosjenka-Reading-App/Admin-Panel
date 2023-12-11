const createAdmin = () => {
  cy.intercept("POST", "/accounts", {
    statusCode: 200,
    body: {
      id_account: 1,
      email: "",
      account_category: "admin",
    },
  }).as("createAdmin");
};

const createAdminRepeated = () => {
  cy.intercept("POST", "/accounts", {
    statusCode: 409,
    body: {
      detail: "Email already registered",
    },
  });
};
export { createAdmin, createAdminRepeated }


