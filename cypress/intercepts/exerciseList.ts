export const exerciseList = () => {
    return cy.intercept('GET', '/exercises?page=1&size=100&title_like=&complexity_like=&categories_like=', {
        statusCode: 200,
        body: {
            items: [
                {
                    title: 'Exercise 1',
                    complexity: 'Easy',
                    categories: ['Category 1', 'Category 2'],
                    completion : 0,
                    position : 0,
                    time_spent : 0,
                },
            ],
        },
    });
};

export const filters = () => {
    return cy.intercept('GET', '/exercises?page=1&size=100&title_like=&complexity_like=&categories_like=', {
        statusCode: 200,
        body: {
            items: [
                {
                    title: 'Exercise 1',
                    complexity: 'Easy',
                    categories: ['Category 1', 'Category 2'],
                    completion : 0,
                    position : 0,
                    time_spent : 0,
                },
            ],
        },
    });
}