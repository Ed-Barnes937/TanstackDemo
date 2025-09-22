import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/links")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen h-screen bg-blue">
      <div className="flex justify-center gap-20 mt-40">
        <div className="flex flex-col justify-center gap-10 p-4 items-center">
          <h3 className="text-2xl font-bold text-yellow">
            Tanstack Query Docs
          </h3>
          <a
            href="https://tanstack.com/query/latest/docs/react"
            className="text-green"
          >
            https://tanstack.com/query/latest/docs/react
          </a>
          <img
            src="QueryDocs.png"
            alt="Tanstack Query docs QR code"
            className="w-56 h-56"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-10 p-4">
          <h3 className="text-2xl font-bold text-yellow">This app</h3>
          <a
            href="https://tanstack-demo-woad.vercel.app"
            className="text-green"
          >
            https://tanstack-demo-woad.vercel.app
          </a>
          <img src="AppCode.png" alt="App QR code" className="w-56 h-56" />
        </div>
      </div>
      <div className="flex justify-center mt-40">
        <h2 className="text-4xl font-extrabold text-yellow">Any questions?</h2>
      </div>
    </div>
  );
}
