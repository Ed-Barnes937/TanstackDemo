import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="h-screen flex flex-col justify-center gap-40 bg-blue">
      <div
        className="flex flex-col gap-4 items-center justify-center"
        style={{ viewTransitionName: "main-content" }}
      >
        <Link
          className="text-2xl font-bold bg-gray-50 text-yellow p-4 rounded-lg shadow-2xl shadow-yellow hover:-translate-y-2 transition-transform duration-200 ease-linear"
          from="/"
          to="/table/$pageNum"
          params={{ pageNum: "1" }}
        >
          Start Demo! 🚀
        </Link>
      </div>
      <div className="flex flex-row gap-10 justify-center">
        <Link
          className="text-xl font-bold rounded-lg bg-gray-50 text-green p-4 shadow-lg shadow-green hover:-translate-y-2 transition-transform duration-200 ease-linear"
          to={"/furtherReading"}
        >
          Further Reading 📚
        </Link>
        <Link
          className="text-xl font-bold rounded-lg bg-gray-50 text-green p-4 shadow-lg shadow-green hover:-translate-y-2 transition-transform duration-200 ease-linear"
          to={"/links"}
        >
          Useful Links 🔗
        </Link>
      </div>
    </div>
  );
}
