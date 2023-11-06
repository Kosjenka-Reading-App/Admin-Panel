import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

type ExerciseItem = {
  id: string;
  name: string;
  complexity: string;
  updatedAt: number;
};

const sortComplexities = (rowA: ExerciseItem, rowB: ExerciseItem) => {
  const a = rowA.complexity;
  const b = rowB.complexity;

  if (a === b) {
    return 0;
  }

  if (a === "Easy") {
    return -1;
  }

  if (a === "Medium") {
    return b === "Easy" ? 1 : -1;
  }

  return 1;
};

const displayComplexity = (exercise: ExerciseItem) => {
  switch (exercise.complexity) {
    case "Easy":
      return (
        <div className="flex items-center justify-center bg-green-200 text-green-600 font-semibold rounded px-2 py-1">
          <div className="bg-green-600 rounded-full h-2 w-2 mr-2"></div>
          {exercise.complexity}
        </div>
      );

    case "Medium":
      return (
        <span className="flex items-center justify-center bg-yellow-200 text-yellow-600 font-semibold rounded px-2 py-1">
          <div className="bg-yellow-600 rounded-full h-2 w-2 mr-2"></div>
          {exercise.complexity}
        </span>
      );

    case "Hard":
      return (
        <span className="flex items-center justify-center bg-red-200 text-red-600 font-semibold rounded px-2 py-1">
          <div className="bg-red-600 rounded-full h-2 w-2 mr-2"></div>
          {exercise.complexity}
        </span>
      );

    default:
      return <span>{exercise.complexity}</span>;
  }
};

const displayLastUpdate = (exercise: ExerciseItem) => {
  const date = new Date(exercise.updatedAt);
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

const displayTitle = (exercise: ExerciseItem) => {
  // TODO CHANGE TO THEME COLORS
  return <span className="text-blue-600 font-semibold">{exercise.name}</span>;
};

const columns = [
  {
    name: "#",
    selector: (row: ExerciseItem) => row.id,
    sortable: true,
    width: "5%",
  },
  {
    name: "Title",
    selector: (row: ExerciseItem) => row.name,
    sortable: true,
    cell: displayTitle,
    width: "50%",
  },
  {
    name: "Complexity",
    selector: (row: ExerciseItem) => row.complexity,
    sortable: true,
    cell: displayComplexity,
    width: "15%",
    sortFunction: sortComplexities,
  },
  {
    name: "Last Update",
    selector: (row: ExerciseItem) => row.updatedAt,
    sortable: true,
    cell: displayLastUpdate,
    width: "20%",
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

const data: ExerciseItem[] = [
  {
    id: "1",
    name: "Bench Press",
    complexity: "Easy",
    updatedAt: Date.now(),
  },
  {
    id: "2",
    name: "Squats",
    complexity: "Medium",
    updatedAt: Date.now(),
  },
  {
    id: "3",
    name: "Deadlift",
    complexity: "Hard",
    updatedAt: Date.now(),
  },
];

export default function ExerciseList() {
  const [exercises, setExercises] = useState<ExerciseItem[]>(data);
  const [isLoading, setIsLoading] = useState(false);
  const [totalExercises, setTotalExercises] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setExercises(data);
      setIsLoading(false);
      setTotalExercises(data.length);
    }, 1000);
  }, [page, perPage]);

  return (
    <DataTable
      title="Exercises"
      columns={columns}
      data={exercises}
      progressPending={isLoading}
      persistTableHead
      pagination
      paginationServer
      paginationTotalRows={totalExercises}
      onChangeRowsPerPage={setPerPage}
      onChangePage={setPage}
    />
  );
}
