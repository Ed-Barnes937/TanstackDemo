import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <Link
        className="text-2xl font-bold bg-[#002B36] text-[#B58900] p-4 rounded-lg shadow-2xl shadow-[#B58900]"
        from="/"
        to="/table/$pageNum"
        params={{ pageNum: "1" }}
      >
        Start Demo! 🚀
      </Link>
    </div>
  );
}
