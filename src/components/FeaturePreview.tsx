import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface FeaturePreviewProps {
  title: string;
  code: string;
  href?: string;
}

const FeaturePreview = ({ title, code, href }: FeaturePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="border border-gray-50 rounded-lg mt-6">
      <div
        className="flex justify-between items-center gap-4 border-b border-gray-100/10 hover:bg-gray-50/20 p-4 cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex gap-4 items-center">
          <h2 className="text-xl font-bold text-yellow">{title}</h2>
          {href && (
            <a
              href={href}
              target="_blank"
              className="font-bold text-green cursor-pointer hover:underline"
            >
              link
            </a>
          )}
        </div>
        <ChevronDoubleDownIcon
          className="w-4 h-4 data-[open=true]:rotate-180 text-white transition-transform duration-200"
          data-open={isOpen}
        />
      </div>
      {isOpen && (
        <div className="p-4">
          <SyntaxHighlighter
            language="typescript"
            style={solarizedDark}
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default FeaturePreview;
