import { meSuperadmin } from "../intercepts/login";
import {
  createCategory,
  createCategoryFailed,
} from "../intercepts/createCategory";
import { listCategories } from "../intercepts/categories";

describe("Create Category Page", () => {
  it("shows all elements of the form", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/categories/create");

    cy.contains("Category Name").should("be.visible");
    cy.get("input[id=name]").should("be.visible");
    cy.contains("button", "Save").should("be.visible");
  });

  it("test invalid form submission", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/categories/create");

    cy.contains("button", "Save").click();

    cy.get("input[id=name]").should(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

  it("test correct submission", () => {
    const categoryName = "Satvik";
    meSuperadmin();
    createCategory(categoryName);
    listCategories();

    cy.visit("http://localhost:5173/categories/create");
    cy.get("input[id=name]").type(categoryName);

    cy.contains("button", "Save").click();

    cy.wait("@createCategory");

    cy.url().should("eq", "http://localhost:5173/categories", {
      timeout: 10000,
    });
  });

  it("test duplicate category", () => {
    const categoryName = "Satvik";
    meSuperadmin();
    createCategoryFailed(categoryName);
    listCategories();

    cy.visit("http://localhost:5173/categories/create");

    cy.get("input[id=name]").type(categoryName);

    cy.contains("button", "Save").click();

    cy.wait("@createCategory");

    cy.url().should("eq", "http://localhost:5173/categories/create", {
      timeout: 10000,
    });

    cy.contains("Category already exists").should("be.visible");
  });

  it("test cancel button", () => {
    const categoryName = "Satvik";
    meSuperadmin();
    createCategory(categoryName);
    listCategories();

    cy.visit("http://localhost:5173/categories/create");

    cy.get("input[id=name]").type(categoryName);

    cy.contains("a", "Cancel").click();

    cy.url().should("eq", "http://localhost:5173/categories", {
      timeout: 10000,
    });
  });
});
