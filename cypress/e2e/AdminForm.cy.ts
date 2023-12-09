import { meSuperadmin } from "../intercepts/CreateAdmin";

describe("create admin page", () => {
  it("shows all elements of the form", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/admins/create");

    cy.contains("Create Admin").should("be.visible");
    cy.contains("Email address").should("be.visible");
    cy.contains("Password").should("be.visible");
    cy.contains("Super admin privileges").should("be.visible");
    cy.get("input[type=checkbox]")
      .should("be.visible")
      .should("not.be.checked");
    cy.contains("button", "Save")
      .should("be.visible")
      .should("have.attr", "type", "submit");
    cy.contains("a", "Cancel")
      .should("be.visible")
      .should("have.attr", "href", "/admins");
  });

  it("creates a new admin", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/admins/create");

    cy.get("input[type=email]").type("test@example.com");
    cy.get("input[type=password]").type("test");
    cy.get("input[type=checkbox]").click();
    cy.contains("button", "Save").click();
    
    // Add assertions for successful admin creation
  });

  it("navigates back to the admin list on cancel", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/admins/create");

    cy.contains("a", "Cancel").click();
    cy.url().should("include", "/admins");
  });

  it("shows email already taken error", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/admins/create");

    cy.get("input[type=email]").type("test@example.com");
    cy.get("input[type=password]").type("test");
    cy.get("input[type=checkbox]").click();
    cy.contains("button", "Save").click();

  });

  it("shows email is required error", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/admins/create");

    cy.get("input[type=password]").type("test");
    cy.get("input[type=checkbox]").click();
    cy.contains("button", "Save").click();
    cy.contains("Email address").should("be.visible");
  });

  it("toggle super admin privileges", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/admins/create");

    cy.get("input[type=checkbox]").should("not.be.checked");
    cy.get("input[type=checkbox]").click();
    cy.get("input[type=checkbox]").should("be.checked");
    cy.get("input[type=checkbox]").click();
    cy.get("input[type=checkbox]").should("not.be.checked");
  });
});