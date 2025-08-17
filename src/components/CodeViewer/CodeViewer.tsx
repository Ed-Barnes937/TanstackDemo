import SyntaxHighlighter from "react-syntax-highlighter"
import { solarizedDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import codeStrings from "./codeStrings"

interface CodeViewerProps {
  step: number
}

const CodeViewer = ({ step }: CodeViewerProps) => {
  const code = codeStrings[step - 1]
  return (
      <SyntaxHighlighter language="typescript" style={solarizedDark} wrapLongLines>
        {code}
      </SyntaxHighlighter>
  )
}

export default CodeViewer