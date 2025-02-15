import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-jsx";

import { useEffect } from "react";

function CodePreview({ showSeperator, html, markdown }) {
  
  useEffect(() => {
    Prism.highlightAll();
  },[html,showSeperator,markdown]);

  return (
    <div
      className={`prose max-w-none w-full p-4 ${
        showSeperator ? "md:border-l-1 max-sm:border-t-1 border-gray-300" : ""
      } `}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}

export default CodePreview;
