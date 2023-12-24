import {
    exerciseList,
    filters
} from '../intercepts/exerciseList';
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

    it("allows navigation to the create exercise page", () => {
        cy.get('a').contains('New exercise').click();
        cy.url().should('include', '/exercises/create');
    });
});
