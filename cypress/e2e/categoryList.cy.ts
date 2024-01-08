import { categoryList, deleteCategory } from "../intercepts/categories";
import { meSuperadmin } from "../intercepts/login";

describe("Category List Page", () => {
    it("shows all elements of the category list", () => {
        meSuperadmin();
        categoryList(10);

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
        categoryList(10);

        cy.visit("http://localhost:5173/categories");
        cy.wait("@categoryList?page=1?name_like=");

        cy.get("div.rdt_TableBody").children().should("have.length", 10);
        cy.contains("#total-categories", "10").should("be.visible");

        for (let i = 1; i < 10; i++) {
            cy.get("div.rdt_TableBody").children().eq(i).contains(`Category ${i + 1}`);
        }
    });

    it("requests next page if limit is reached", () => {
        meSuperadmin();
        categoryList(11);

        cy.visit("http://localhost:5173/categories");
        cy.wait("@categoryList?page=1?name_like=");

        cy.get("div.rdt_TableBody").children().should("have.length", 10);
        cy.contains("#total-categories", "11").should("be.visible");
        cy.get("#pagination-next-page").should("not.disabled");
        cy.get("#pagination-previous-page").should("be.disabled");

        categoryList(11, 2);
        cy.get("#pagination-next-page").click();
        cy.wait("@categoryList?page=2?name_like=");
    });

    it("requests previous page if limit is reached", () => {
        meSuperadmin();
        categoryList(11);

        cy.visit("http://localhost:5173/categories");
        cy.wait("@categoryList?page=1?name_like=");

        cy.get("div.rdt_TableBody").children().should("have.length", 10);
        cy.contains("#total-categories", "11").should("be.visible");
        cy.get("#pagination-next-page").should("not.disabled");
        cy.get("#pagination-previous-page").should("be.disabled");

        categoryList(15, 2);
        cy.get("#pagination-next-page").click();
        cy.wait("@categoryList?page=2?name_like=");

        cy.get("#pagination-previous-page").should("not.disabled");
        cy.get("#pagination-next-page").should("be.disabled");

        categoryList(15);
        cy.get("#pagination-previous-page").click();
        cy.wait("@categoryList?page=1?name_like=");
    });

    it("search filter requests correct information", () => {
        meSuperadmin();
        categoryList(10);

        cy.visit("http://localhost:5173/categories");
        cy.wait("@categoryList?page=1?name_like=");

        cy.get("div.rdt_TableBody").children().should("have.length", 10);
        cy.contains("#total-categories", "10").should("be.visible");

        categoryList(1, 1, "Category");
        cy.get("input[placeholder=Search]").type("Category");
        cy.get("button[type=submit]").click();
        cy.wait("@categoryList?page=1?name_like=Category");

        cy.get("div.rdt_TableBody").children().should("have.length", 1);
        cy.contains("#total-categories", "1").should("be.visible");
    });

    it("Name sort requests correct information", () => {
        meSuperadmin();
        categoryList(10);

        cy.visit("http://localhost:5173/categories");
        cy.wait("@categoryList?page=1?name_like=");

        categoryList(10, 1, "", "asc", "name");
        cy.contains("name").click();
        cy.wait("@categoryList?page=1?name_like=?sortOrder=asc?sortField=name");

        categoryList(10, 1, "", "desc", "name");
        cy.contains("name").click();
        cy.wait("@categoryList?page=1?name_like=?sortOrder=desc?sortField=name");
    });

    it("shows delete modal and cancel should close", () => {
        meSuperadmin();
        categoryList(10);

        cy.visit("http://localhost:5173/categories");
        cy.wait("@categoryList?page=1?name_like=");

        cy.get("div.rdt_TableBody").children().should("have.length", 10);

        cy.get("div.rdt_TableBody").children().first().children().last().click();

        cy.contains("Delete Category").should("be.visible");

        cy.contains("Delete").click();
        cy.contains(
            'Are you sure you want to delete "Category 1"? You will not be able to recover this category if you proceed with this operation!'
        ).should("be.visible");
        cy.contains("Cancel").click();
        cy.contains(
            'Are you sure you want to delete "Category 1"? You will not be able to recover this category if you proceed with this operation!'
        ).should("not.exist");
    });

    it("shows delete modal and delete should close", () => {
        meSuperadmin();
        categoryList(10);
        deleteCategory("Category 1");

        cy.visit("http://localhost:5173/categories");
        cy.wait("@categoryList?page=1?name_like=");

        cy.get("div.rdt_TableBody").children().should("have.length", 10);

        cy.get("div.rdt_TableBody").children().first().children().last().click();

        cy.contains("Delete Category").should("be.visible");

        deleteCategory("Category 1");
        cy.contains("button", "Delete").click();
        cy.wait("@deleteCategory");

        cy.contains(
            'Are you sure you want to delete "Category 1"? You will not be able to recover this category if you proceed with this operation!'
        ).should("not.exist");
    });
});
