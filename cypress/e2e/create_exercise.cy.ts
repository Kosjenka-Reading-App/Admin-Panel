import { meSuperadmin } from "../intercepts/login";

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

  // Test invalid form

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
