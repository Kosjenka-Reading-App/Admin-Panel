import { create } from "domain";
import { meSuperadmin } from "../intercepts/login";
import { createExercise } from "../intercepts/createExercise";

describe("create exercise page", () => {
  it("shows all elements of the form", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/exercises/create");

    cy.contains("Create Exercise").should("be.visible");
    cy.contains("Title").should("be.visible");
    cy.contains("Complexity").should("be.visible");
    cy.contains("Text").should("be.visible");
    cy.contains("button", "Save").should("be.visible");
  });

  it("test invalid form", () => {
    meSuperadmin();

    cy.visit("http://localhost:5173/exercises/create");

    cy.contains("button", "Save").click();
    cy.get("input[name=title]").then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });

    cy.get("textarea[name=text]").then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

  it("test correct submission", () => {
    meSuperadmin();
    createExercise();

    cy.visit("http://localhost:5173/exercises/create");

    cy.get("input[name=title]").type("test");
    cy.get("textarea[name=text]").type("test");

    cy.get("#complexity").type("{enter}");

    cy.contains("button", "Save").click();

    cy.wait("@createExercise").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.url().should("eq", "http://localhost:5173/exercises");
  });
});
