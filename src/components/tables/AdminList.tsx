import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import adminsService from "../../services/admins";
import { Link } from "react-router-dom";

type AdminItem = {
  id_account: number;
  email: string;
  account_category: string;
};

const displayAdminType = (admin: AdminItem) => {
  switch (admin.account_category) {
    case "admin":
      return (
        <div className="flex items-center justify-center bg-green-200 text-green-600 font-semibold rounded px-2 py-1">
          <div className="bg-green-600 rounded-full h-2 w-2 mr-2"></div>
          Admin
        </div>
      );
    case "superadmin":
      return (
        <span className="flex items-center justify-center bg-red-200 text-red-600 font-semibold rounded px-2 py-1">
          <div className="bg-red-600 rounded-full h-2 w-2 mr-2"></div>
          Super Admin
        </span>
      );

    default:
      return <span>{admin.account_category}</span>;
  }
};

const displayEmail = (admin: AdminItem) => {
  return (
    <span className="text-custom-dark-blue font-semibold">{admin.email}</span>
  );
};

const columns = [
  {
    name: "#",
    selector: (row: AdminItem) => row.id_account,
    sortable: false,
    width: "5%",
  },
  {
    name: "email",
    selector: (row: AdminItem) => row.email,
    sortable: true,
    cell: displayEmail,
    width: "70%",
  },
  {
    name: "type",
    selector: (row: AdminItem) => row.account_category,
    sortable: true,
    cell: displayAdminType,
    width: "15%",
  },
  {
    name: "Actions",
    cell: () => (
      <div className="w-full flex justify-center">
        <div className="cursor-pointer">
          <FaPencilAlt />
        </div>
      </div>
    ),
    width: "10%",
    ignoreRowClick: true,
  },
];

export default function AdminList() {
  const [admins, setAdmins] = useState<AdminItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState<{
    column: string | undefined;
    direction: "asc" | "desc";
  } | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setIsLoading(true);

    adminsService
      .list(page, perPage, filter, sort?.column || "", sort?.direction || "")
      .then((data) => {
        const admins = data.data;
        setAdmins(admins);
        setIsLoading(false);
        setTotalAdmins(admins.length); // TODO: get total from API
      });
  }, [filter, page, perPage, sort]);

  return (
    <div>
      <div className="bg-custom-light-grey py-3 px-4">
        <h1 className="font-bold text-2xl">
          Admins{" "}
          <span className="bg-gray-200 px-2 py-1 text-xs rounded-xl text-blue-600 font-normal">
            {totalAdmins}
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
          to="/admins/create"
          className="bg-custom-dark-blue flex text-white px-3 py-2 rounded font-medium items-center justify-center text-sm hover:bg-custom-hover-blue transition"
        >
          <FaPlus /> <span className="ml-2">New admin</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={admins}
        progressPending={isLoading}
        persistTableHead
        pagination
        paginationServer
        paginationTotalRows={totalAdmins}
        onSort={(column, direction) =>
          setSort({ column: column.name?.toString(), direction })
        }
        onChangeRowsPerPage={setPerPage}
        onChangePage={setPage}
      />
    </div>
  );
}
