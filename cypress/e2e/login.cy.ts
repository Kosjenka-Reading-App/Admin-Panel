describe("login spec", () => {
  it("shows form", () => {
    cy.visit("http://localhost:5173/login", { timeout: 10000 });

    cy.contains("Login to admin panel", { matchCase: false, timeout: 10000 });
    cy.contains("Email Address")
      .should("be.visible", { matchCase: false })
      .should("have.attr", "for", "email");

    cy.contains("label", "Password")
      .should("be.visible")
      .should("have.attr", "for", "password");

    cy.contains("Invalid Username/Password").should("not.be.visible");

    cy.contains("Forgot Password?")
      .should("be.visible")
      .should("have.attr", "href", "/password/reset");
  });
});
