import { useState } from "react";
import CodePreview from "../components/CodePreview";
import Editor from "../components/Editor";
import Button from "../components/Button";
import DOMPurify from "dompurify";
import { api } from "../http/api";
import { BookOpenText, NotebookPen, SquareSplitHorizontal } from "lucide-react";
import useDebounce from "../hooks/useDebounce";

function MarkdownToHTML() {
  const [activeTab, setActiveTab] = useState("split");
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState();
  const [error, setError] = useState(false);

  const debounce = useDebounce();

  const getHtml = debounce(async (markdownText) => {
    error && setError(false);

    if (!markdownText) {
      setHtml("");
      return;
    }

    try {
      const res = await api.post("/html", { markdown: markdownText });
      const sanitisedHTML = DOMPurify.sanitize(res.data.html);
      setHtml(sanitisedHTML);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }, 350);

  if (error) {
    return (
      <div className="flex flex-col gap-4  h-[calc(100vh-209px)] w-full items-center justify-center">
        <p>Something Went wrong, please try later or refresh the page</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="m-4 border border-gray-300 rounded-md ">
      <div className="tab-group flex border-b border-gray-300 bg-gray-100">
        <Button
          isActive={activeTab === "edit"}
          onClick={() => setActiveTab("edit")}
        >
          <div className="flex gap-1 items-center ">
            <span>Write</span>
            <NotebookPen size={18} className="mt-1" />
          </div>
        </Button>
        <Button
          isActive={activeTab === "split"}
          onClick={() => setActiveTab("split")}
        >
          <div className="flex gap-1 items-center">
            <span>Split</span>
            <SquareSplitHorizontal size={18} className="mt-1" />
          </div>
        </Button>
        <Button
          isActive={activeTab === "read"}
          onClick={() => setActiveTab("read")}
        >
          <div className="flex gap-1 items-center">
            <span>Read</span>
            <BookOpenText size={18} className="mt-1" />
          </div>
        </Button>
      </div>
      <div
        className={`editor-container h-[calc(100vh-209px)] overflow-auto grid max-sm:grid-cols-1  ${
          activeTab !== "split"
            ? "md:grid-cols-1 container mx-auto"
            : "md:grid-cols-2"
        }`}
      >
        {activeTab !== "read" && (
          <Editor
            getHtml={getHtml}
            markdown={markdown}
            setMarkdown={setMarkdown}
          />
        )}
        {activeTab !== "edit" && (
          <CodePreview
            showSeperator={activeTab === "split"}
            html={html}
            markdown={markdown}
          />
        )}
      </div>
    </div>
  );
}

export default MarkdownToHTML;
