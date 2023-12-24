import { exerciseList } from '../intercepts/exerciseList';
import { meSuperadmin } from "../intercepts/login";
import { createExercise } from "../intercepts/createExercise";
import { listCategories } from "../intercepts/categories";

describe("Exercise List Page", () => {
    beforeEach(() => {
        meSuperadmin();
        exerciseList(); // Add exerciseList intercept
        cy.visit('http://localhost:5173/exercises');
    });

    it("shows the main elements of the page", () => {
        cy.contains('h1', 'Exercises').should('be.visible');
        cy.get('input[name="query"]').should('be.visible');
        cy.get('a').contains('New exercise').should('be.visible');
    });

    // it("shows exercise table with expected columns", () => {
    //     cy.get('.rdt_TableCol').should('contain', '#');
    //     cy.get('.rdt_TableCol').should('contain', 'Title');
    //     cy.get('.rdt_TableCol').should('contain', 'Category');
    //     cy.get('.rdt_TableCol').should('contain', 'Complexity');
    //     cy.get('.rdt_TableCol').should('contain', 'Last update');
    //     cy.get('.rdt_TableCol').should('contain', 'Actions');
    // });

    it("allows navigation to the create exercise page", () => {
        cy.get('a').contains('New exercise').click();
        cy.url().should('include', '/exercises/create');
    });
    // Additional tests can be added as needed
    it("displays the correct title count", () => {
        cy.get('h1').contains('Exercises').should('be.visible');
        cy.get('h1').contains('Exercises').should('have.length', 1);
    })
});
