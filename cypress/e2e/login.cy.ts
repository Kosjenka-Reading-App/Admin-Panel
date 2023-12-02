import {
  meAdmin,
  meSuperadmin,
  meUnauthorized,
  postLoginFailure,
  postLoginSuccess,
} from "../intercepts/login";

describe("login spec", () => {
  it("shows form", () => {
    meUnauthorized();

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

  it("shows error message for invalid credentials", () => {
    meUnauthorized();
    postLoginFailure();

    cy.visit("http://localhost:5173/login", { timeout: 10000 });

    cy.get("input[name=email]").type("test@gmail.com");
    cy.get("input[name=password]").type("password");
    cy.get("button[type=submit]").click();

    cy.contains("Invalid Username/Password").should("be.visible");
  });

  it("redirects to admin dashboard when valid admin credentials", () => {
    meUnauthorized();
    postLoginSuccess();

    cy.visit("http://localhost:5173/login", { timeout: 10000 });

    cy.get("input[name=email]").type("test@gmail.com");
    cy.get("input[name=password]").type("password");
    cy.get("button[type=submit]").click();

    meSuperadmin();

    cy.url().should("not.include", "/login");
  });

  it("redirects to admin dashboard when valid superadmin credentials", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173");
    cy.url().should("include", "/admins");
  });

  it("redirects to exercises dashboard when valid admin credentials and exclude forbidden routes", () => {
    meAdmin();

    cy.visit("http://localhost:5173");
    cy.url().should("not.include", "/admins");
    cy.url().should("include", "/exercises");
  });

  it("redirects to login page when unauthorized", () => {
    meUnauthorized();

    cy.visit("http://localhost:5173");
    cy.url().should("include", "/login");
  });
});
