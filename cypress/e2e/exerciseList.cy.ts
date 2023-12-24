import { deleteExercise, exerciseList } from "../intercepts/exerciseList";
import { meSuperadmin } from "../intercepts/login";

describe("Exercise List Page", () => {
  it("shows all elements of the exercise list", () => {
    meSuperadmin();
    exerciseList(0);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    cy.contains("Exercises").should("be.visible");
    cy.contains("New exercise").should("be.visible");

    cy.contains("Actions").should("be.visible");
    cy.contains("title").should("be.visible");
    cy.contains("complexity").should("be.visible");
    cy.contains("category").should("be.visible");
    cy.contains("last update").should("be.visible");
    cy.get("input[placeholder=Search]").should("be.visible");
    cy.contains("#total-exercises", "0").should("be.visible");
  });

  it("shows correct number of exercises", () => {
    meSuperadmin();
    exerciseList(10);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);
    cy.contains("#total-exercises", "10").should("be.visible");

    cy.get("div.rdt_TableBody").children().first().contains("1");
    cy.get("div.rdt_TableBody").children().first().contains("Exercise 1");
    cy.get("div.rdt_TableBody").children().first().contains("Easy");
    cy.get("div.rdt_TableBody").children().first().contains("Category 1");

    cy.get("div.rdt_TableBody").children().eq(8).contains("2");
    cy.get("div.rdt_TableBody").children().eq(8).contains("Exercise 9");
    cy.get("div.rdt_TableBody").children().eq(8).contains("Hard");
    cy.get("div.rdt_TableBody")
      .children()
      .eq(8)
      .contains("Category 1, Category 2, Category 3");
  });

  it("requests next page if limit is reached", () => {
    meSuperadmin();
    exerciseList(11);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);
    cy.contains("#total-exercises", "11").should("be.visible");
    cy.get("#pagination-next-page").should("not.disabled");
    cy.get("#pagination-previous-page").should("be.disabled");

    exerciseList(11, 2);
    cy.get("#pagination-next-page").click();
    cy.wait("@exerciseList?page=2?title_like=");
  });

  it("requests previous page if limit is reached", () => {
    meSuperadmin();
    exerciseList(11);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);
    cy.contains("#total-exercises", "11").should("be.visible");
    cy.get("#pagination-next-page").should("not.disabled");
    cy.get("#pagination-previous-page").should("be.disabled");

    exerciseList(11, 2);
    cy.get("#pagination-next-page").click();
    cy.wait("@exerciseList?page=2?title_like=");

    cy.get("#pagination-previous-page").should("not.disabled");
    cy.get("#pagination-next-page").should("be.disabled");

    exerciseList(11);
    cy.get("#pagination-previous-page").click();
    cy.wait("@exerciseList?page=1?title_like=");
  });

  it("search filter requests correct information", () => {
    meSuperadmin();
    exerciseList(10);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);
    cy.contains("#total-exercises", "10").should("be.visible");

    exerciseList(1, 1, "Exercise");
    cy.get("input[placeholder=Search]").type("Exercise");
    cy.get("button[type=submit]").click();
    cy.wait("@exerciseList?page=1?title_like=Exercise");

    cy.get("div.rdt_TableBody").children().should("have.length", 1);
    cy.contains("#total-exercises", "1").should("be.visible");
  });

  it("complexity sort requests correct information", () => {
    meSuperadmin();
    exerciseList(10);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    exerciseList(10, 1, "", "asc", "complexity");
    cy.contains("complexity").click();
    cy.wait(
      "@exerciseList?page=1?title_like=?sortOrder=asc?sortField=complexity"
    );

    exerciseList(10, 1, "", "desc", "complexity");
    cy.contains("complexity").click();
    cy.wait(
      "@exerciseList?page=1?title_like=?sortOrder=desc?sortField=complexity"
    );
  });

  it("title sort requests correct information", () => {
    meSuperadmin();
    exerciseList(10);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    exerciseList(10, 1, "", "asc", "title");
    cy.contains("title").click();
    cy.wait("@exerciseList?page=1?title_like=?sortOrder=asc?sortField=title");

    exerciseList(10, 1, "", "desc", "title");
    cy.contains("title").click();
    cy.wait("@exerciseList?page=1?title_like=?sortOrder=desc?sortField=title");
  });

  it("date sort requests correct information", () => {
    meSuperadmin();
    exerciseList(10);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    exerciseList(10, 1, "", "asc", "date");
    cy.contains("last update").click();
    cy.wait("@exerciseList?page=1?title_like=?sortOrder=asc?sortField=date");

    exerciseList(10, 1, "", "desc", "date");
    cy.contains("last update").click();
    cy.wait("@exerciseList?page=1?title_like=?sortOrder=desc?sortField=date");
  });

  it("shows error message if there are no exercises", () => {
    meSuperadmin();
    exerciseList(0);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    cy.contains("There are no records to display").should("be.visible");
  });

  it("shows delete modal and cancel should close", () => {
    meSuperadmin();
    exerciseList(10);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);

    cy.get("div.rdt_TableBody").children().first().children().last().click();

    cy.contains("Delete exercise").should("be.visible");

    cy.contains("Delete").click();
    cy.contains(
      'Are you sure you want to delete "Exercise 1"? You will not be able to recover this exercise if you proceed with this operation!'
    ).should("be.visible");
    cy.contains("Cancel").click();
    cy.contains(
      'Are you sure you want to delete "Exercise 1"? You will not be able to recover this exercise if you proceed with this operation!'
    ).should("not.exist");
  });

  it.only("shows delete modal and delete should close", () => {
    meSuperadmin();
    exerciseList(10);

    cy.visit("http://localhost:5173/exercises");
    cy.wait("@exerciseList?page=1?title_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);

    cy.get("div.rdt_TableBody").children().first().children().last().click();

    cy.contains("Delete exercise").should("be.visible");

    deleteExercise(1);
    cy.contains("button", "Delete").click();
    cy.wait("@deleteExercise");
    cy.contains(
      'Are you sure you want to delete "Exercise 1"? You will not be able to recover this exercise if you proceed with this operation!'
    ).should("not.exist");
  });
});
