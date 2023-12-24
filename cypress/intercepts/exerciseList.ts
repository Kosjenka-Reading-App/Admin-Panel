const exerciseList = (
  num: number,
  page?: number,
  nameQuery?: string,
  sortOrder?: "asc" | "desc",
  sortField?: "title" | "complexity" | "date"
) => {
  cy.intercept(
    "GET",
    `/exercises?page=${page || 1}&size=10&title_like=${nameQuery || ""}${
      sortOrder ? `&order=${sortOrder}` : ""
    }${sortField ? `&order_by=${sortField}` : ""}`,
    {
      statusCode: 200,
      body: {
        total: num,
        page: 1,
        pages: Math.floor(num / 10),
        items: Array.from({ length: num < 10 ? num : 10 }, (_, i) => ({
          id: i + 1,
          title: `Exercise ${i + 1}`,
          complexity: ["Easy", "Medium", "Hard"][i % 3],
          category: [
            { category: "Category 1" },
            { category: "Category 2" },
            { category: "Category 3" },
          ].splice(0, (i % 3) + 1),
          completion: 0,
          position: 0,
          time_spent: 0,
        })),
      },
    }
  ).as(
    `exerciseList?page=${page || 1}?title_like=${nameQuery || ""}${
      sortOrder ? `?sortOrder=${sortOrder}` : ""
    }${sortField ? `?sortField=${sortField}` : ""}`
  );
};

const deleteExercise = (id: number) => {
  cy.intercept("DELETE", `/exercises/${id}`, {
    statusCode: 200,
    body: {},
  }).as(`deleteExercise`);
};

export { exerciseList, deleteExercise };
