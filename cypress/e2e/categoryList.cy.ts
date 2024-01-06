import { categoryList } from "../intercepts/categories";
import { meSuperadmin } from "../intercepts/login";

describe("Category List Page", () => {
    it("shows all elements of the category list", () => {
        meSuperadmin();
        categoryList(0);

        cy.visit("http://localhost:5173/categories");
        cy.wait("@categoryList?page=1?name_like=");

        cy.contains("Categories").should("be.visible");
        cy.contains("New category").should("be.visible");

        cy.contains("Actions").should("be.visible");
        cy.contains("name").should("be.visible");
        cy.get("input[placeholder=Search]").should("be.visible");
        cy.contains("#total-categories", "0").should("be.visible");
    });

    it("shows correct number of categories", () => {
        meSuperadmin();
        categoryList(1);

        cy.visit("http://localhost:5173/categories");
        cy.wait("@categoryList?page=1?name_like=");

        cy.get("div.rdt_TableBody").children().should("have.length", 10);
        cy.contains("#total-categories", "10").should("be.visible");

        for (let i = 1; i < 10; i++) {
            cy.get("div.rdt_TableBody").children().eq(i).contains(`Category ${i + 1}`);
        }
    });
});
