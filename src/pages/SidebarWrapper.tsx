import Sidebar from "../components/Sidebar";

export default function SidebarPage({ page }: { page: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <div className="w-16">
        <Sidebar />
      </div>
      <div className="flex-grow w-full">{page}</div>
    </div>
  );
}
