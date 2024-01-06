export const listCategories = () => {
  cy.intercept("GET", "/categories?page=1&size=100&name_like=", {
    statusCode: 200,
    body: {
      items: [
        {
          category: "category",
        },
      ],
    },
  });
};

const categoryList = (
  num: number,
  page?: number,
  nameQuery?: string,
  sortOrder?: "asc" | "desc",
  sortField?: "name" 
) => {
 
  cy.intercept(
    "GET",
    `/categories?page=${page || 1}&size=10&name_like=${nameQuery || ""}${
      sortOrder ? `&order=${sortOrder}` : ""
    }${sortField ? `&order_by=${sortField}` : ""}`,
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
    }${sortField ? `?sortField=${sortField}` : ""}`
  );
};

export { categoryList };