import {
  featurePreviewStrings,
  wordCloud,
} from "@/components/CodeViewer/featurePreviewStrings";
import FeaturePreview from "@/components/FeaturePreview";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/furtherReading")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-screen bg-blue p-10">
      <div
        className="flex flex-col gap-4"
        style={{ viewTransitionName: "main-content" }}
      >
        <h1 className="text-3xl font-bold text-yellow underline mb-4">
          More concepts to explore...
        </h1>
        <div className="grid grid-cols-3 gap-4 h-80 w-full place-items-center">
          {wordCloud.map((word) => (
            <span
              key={word}
              className="px-3 py-2 bg-gray-50 text-light-blue shadow-light-blue shadow-lg rounded-lg font-medium whitespace-nowrap hover:scale-110 transition-transform duration-1000"
              style={{
                fontSize: `${Math.random() * 1 + 0.8}rem`,
                transform: `rotate(${Math.random() * 20 - 10}deg)`,
                transformOrigin: "center",
              }}
            >
              {word}
            </span>
          ))}
        </div>
        <div className="m-auto p-4 min-w-1/2">
          <FeaturePreview
            title="Select"
            code={featurePreviewStrings.select}
            href="https://tanstack.com/query/latest/docs/framework/react/guides/render-optimizations#select"
          />
          <FeaturePreview
            title="Conditional Queries"
            code={featurePreviewStrings.conditionalQueries}
            href="https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries"
          />
          <FeaturePreview
            title="Dependent Queries"
            code={featurePreviewStrings.dependentQueries}
            href="https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries"
          />
          <FeaturePreview
            title="Parallel Queries"
            code={featurePreviewStrings.parallelQueries}
            href="https://tanstack.com/query/latest/docs/framework/react/guides/parallel-queries#dynamic-parallel-queries-with-usequeries"
          />
        </div>
        <div className="flex justify-center">
          <Link
            to="/links"
            className="text-xl font-bold rounded-lg bg-gray-50 text-green p-4 shadow-lg shadow-green hover:-translate-y-2 transition-transform duration-200 ease-linear"
            viewTransition={true}
          >
            The end?
          </Link>
        </div>
      </div>
    </div>
  );
}
