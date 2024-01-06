const categoryList = (
  page?: number,
  nameQuery?: string,
  sortOrder?: "asc" | "desc",
) => {
  const num = 10; 
  cy.intercept(
    "GET",
    `/categories?page=${page || 1}&size=10&name_like=${nameQuery || ""}${
      sortOrder ? `&order=${sortOrder}` : ""
    }`,
    {
      statusCode: 200,
      body: {
        items: Array.from({ length: num < 10 ? num : 10 }, (_, i) => ({
          category: `Category ${i + 1}`
        })),
        total: num,
        page: page || 1,
        size: 10,
        pages: Math.ceil(num / 10)
      },
    }
  ).as(
    `categoryList?page=${page || 1}?name_like=${nameQuery || ""}${ 
      sortOrder ? `?sortOrder=${sortOrder}` : ""
    }`
  );
};

export { categoryList };