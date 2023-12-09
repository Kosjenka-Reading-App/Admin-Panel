import DataTable from "react-data-table-component";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import categoriesService from "../../services/categories";
import { Link, useNavigate } from 'react-router-dom';
import ConfirmModal from "../ConfirmModal";



type CategoryItem = string;

const displayName = (category: CategoryItem) => {
  return (
    <span className="text-custom-dark-blue font-semibold">{category}</span>
  );
};


export default function CategoriesList() {

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [nameToDelete, setNameToDelete] = useState("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCategories, setTotalCategories] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState<{
    column: string | undefined;
    direction: "asc" | "desc";
  } | null>(null);
  const [filter, setFilter] = useState("");

  const search = useCallback(() => {
    setIsLoading(true);

    categoriesService
      .list(page, perPage, filter, sort?.column || "", sort?.direction || "")
      .then((data) => {
        setCategories(data.data);
        setIsLoading(false);
        setTotalCategories(data.total);
      });
  }, [filter, page, perPage, sort]);

  const onDelete = useCallback((name: string) => {
    setModalOpen(true);
    setNameToDelete(name);
  }, []);

  const onConfirmDelete = useCallback(() => {
    categoriesService.deleteCategory(nameToDelete).then(search);
    setModalOpen(false);
  }, [nameToDelete, search]);

  const columns = useMemo(
    () => [
      {
        name: "name",
        selector: (row: CategoryItem) => row,
        sortable: true,
        cell: displayName,
        width: "90%",
      },
      {
        name: "Actions",
        cell: (row: CategoryItem) => (
          <div className="w-full flex justify-center">
            <div className="cursor-pointer p-1 text-xl"
            onClick={() => navigate(`/categories/${row}/edit`)}>
              <MdEdit />
            </div>
            <div className="cursor-pointer p-1 text-xl"
              onClick={() => onDelete(row)}>
              <AiFillDelete />
            </div>
          </div>
        ),
        width: "10%",
        ignoreRowClick: true,
      },
    ],
    [onDelete]
  );

  useEffect(() => {
    search();
  }, [search]);

  return (
    <>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => onConfirmDelete()}
        title="Delete Category"
        text={`Are you sure you want to delete "${nameToDelete}"? You will not be able to recover this category if you proceed with this operation!`}
        confirmText="Delete"
      />
      <div>
        <div className="bg-custom-light-grey py-3 px-4">
          <h1 className="font-bold text-2xl">
            Categories{" "}
            <span className="bg-gray-200 px-2 py-1 text-xs rounded-xl text-blue-600 font-normal">
              {totalCategories}
            </span>
          </h1>
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const formData = new FormData(e.target as HTMLFormElement);
              const query = formData.get("query")?.toString() || "";
              setFilter(query);
            }}
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              className="border border-gray-300 rounded-l px-2 py-1 w-96 focus:outline-none focus:ring focus:border-custom-light-blue"
            />
            <button
              type="submit"
              className="bg-custom-dark-blue text-white px-3 py-2 rounded-r rounded-l-none font-semibold transition hover:bg-custom-hover-blue"
            >
              <AiOutlineSearch />
            </button>
          </form>
          <Link
            to="create"
            className="bg-custom-dark-blue flex text-white px-3 py-2 rounded font-medium items-center justify-center text-sm hover:bg-custom-hover-blue transition"
          >
            <FaPlus /> <span className="ml-2">New category</span>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={categories}
          progressPending={isLoading}
          persistTableHead
          pagination
          paginationServer
          paginationTotalRows={totalCategories}
          sortServer
          onSort={(column, direction) =>
            setSort({ column: column.name?.toString(), direction })
          }
          onChangeRowsPerPage={setPerPage}
          onChangePage={setPage}
        />
      </div>
    </>
  );
}
