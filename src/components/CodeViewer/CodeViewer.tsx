import SyntaxHighlighter from "react-syntax-highlighter"
import { solarizedDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import codeStrings from "./codeStrings"

interface CodeViewerProps {
  step: number
}

const CodeViewer = ({ step }: CodeViewerProps) => {
  const code = codeStrings[step]
  return (
    <div className="bg-[#002B36] p-6 rounded-lg shadow-md shadow-gray-100 w-1/2">
      <SyntaxHighlighter language="typescript" style={solarizedDark} wrapLongLines>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeViewer