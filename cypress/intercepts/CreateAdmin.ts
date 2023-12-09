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

  export const meSuperadmin = () =>
  cy.intercept("GET", "/me", {
    statusCode: 200,
    body: {
      id_account: 1,
      email: "superadmin@kosjenka.com",
      account_category: "superadmin",
    },
  });
