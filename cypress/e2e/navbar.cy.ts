import {
  meAdmin,
  meSuperadmin,
  meUnauthorized,
  postLoginFailure,
  postLoginSuccess,
} from "../intercepts/login";

describe("navbar spec", () => {
  it("shows all navbar items if superadmin", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173");

    cy.get('a[id="sidebar-/exercises"]').should("be.visible");
    cy.get('a[id="sidebar-/categories"]').should("be.visible");
    cy.get('a[id="sidebar-/admins"]').should("be.visible");
  });

  it("shows only admin navbar items if admin", () => {
    meAdmin();

    cy.visit("http://localhost:5173");

    cy.get('a[id="sidebar-/exercises"]').should("be.visible");
    cy.get('a[id="sidebar-/categories"]').should("be.visible");
    cy.get('a[id="sidebar-/admins"]').should("not.exist");
    // Not exist should be last because if we use it in first, the page will not be rendered yet and mislead the test
  });

  it("redirect to admin page if click on admin navbar item", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/exercises");

    cy.get('a[id="sidebar-/admins"]').click();

    cy.url().should("include", "/admins");
  });

  it("redirect to exercises page if click on admin navbar item", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/admins");

    cy.get('a[id="sidebar-/exercises"]').click();

    cy.url().should("include", "/exercises");
  });

  it("redirect to categories page if click on admin navbar item", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/admins");

    cy.get('a[id="sidebar-/categories"]').click();

    cy.url().should("include", "/categories");
  });
});
