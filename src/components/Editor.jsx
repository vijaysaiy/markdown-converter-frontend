import { useRef } from "react";

function Editor({ getHtml, markdown, setMarkdown }) {
  const textAreaRef = useRef();
  const lineNumberRef = useRef();

  const handleChange = (e) => {
    const text = e.target.value;
    setMarkdown(text);
    getHtml(text);
  };

  const syncScroll = () => {
    const textArea = textAreaRef.current;
    const lineNumbers = lineNumberRef.current;
    if (textArea) {
      lineNumbers.scrollTop = textArea.scrollTop;
    }
  };

  return (
    <div className="flex w-full gap-4 p-4">
      <div ref={lineNumberRef} className="overflow-hidden">
        {markdown.split("\n").map((_line, index) => (
          <p key={index} className="text-xs text-gray-500 h-6 leading-6">
            {index + 1}
          </p>
        ))}
      </div>
      <textarea
        autoFocus
        ref={textAreaRef}
        className="w-full resize-none focus:outline-0 transition-all duration-300 ease-in-out"
        placeholder="Write markdown here..."
        value={markdown}
        onChange={handleChange}
        onScroll={syncScroll}
      />
    </div>
  );
}

export default Editor;
