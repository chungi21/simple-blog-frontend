import React from "react";

export default function PostForm({
  title,
  content,
  onChangeTitle,
  onChangeContent,
  onSubmit,
  submitText = "작성",
}) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={onChangeTitle}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={onChangeContent}
      />
      <button type="submit">{submitText}</button>
    </form>
  );
}
