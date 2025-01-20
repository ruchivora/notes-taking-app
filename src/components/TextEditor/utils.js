/* Preserve cursor position while editing */
export const saveCursorPosition = (editorRef) => {
  const selection = window.getSelection();
  if (!selection.rangeCount) return null;
  const range = selection.getRangeAt(0);
  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(editorRef.current);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  const start = preSelectionRange.toString().length;
  return start;
};

export const restoreCursorPosition = (start,editorRef) => {
  const selection = window.getSelection();
  const range = document.createRange();
  let charCount = 0;
  let node = editorRef.current;

  const traverseNodes = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const nextCharCount = charCount + node.length;
      if (start >= charCount && start <= nextCharCount) {
        range.setStart(node, start - charCount);
        range.setEnd(node, start - charCount);
        return true;
      }
      charCount = nextCharCount;
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        if (traverseNodes(node.childNodes[i])) return true;
      }
    }
    return false;
  };

  traverseNodes(node);
  selection.removeAllRanges();
  selection.addRange(range);
};