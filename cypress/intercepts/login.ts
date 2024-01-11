export const meUnauthorized = () =>
  cy.intercept("GET", "/me", {
    statusCode: 401,
    body: {
      message: "Unauthorized",
    },
  });

export const meSuperadmin = () =>
  cy.intercept("GET", "/me", {
    statusCode: 200,
    body: {
      id_account: 1,
      email: "superadmin@kosjenka.com",
      account_category: "superadmin",
    },
  });

export const meAdmin = () =>
  cy.intercept("GET", "/me", {
    statusCode: 200,
    body: {
      id_account: 1,
      email: "admin@kosjenka.com",
      account_category: "admin",
    },
  });

export const postLoginFailure = () =>
  cy.intercept("POST", "/login", {
    statusCode: 400,
    body: {},
  });

export const postLoginSuccess = () =>
  cy.intercept("POST", "/login", {
    statusCode: 200,
    body: {},
  });

