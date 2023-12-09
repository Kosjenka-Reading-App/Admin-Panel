const createAdmin = () => {
  cy.intercept("POST", "/accounts", {
    statusCode: 200,
    body: {
      id_account: 1,
      email: "",
      account_category: "admin",
    },
  });
};

const createAdminRepeated = () => {
  cy.intercept("POST", "/accounts", {
    statusCode: 409,
    body: {
      message: "Email already taken",
    },
  });
}

export { createAdmin, createAdminRepeated }


