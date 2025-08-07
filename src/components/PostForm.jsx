import React from "react";

export default function PostForm({ title, content, onChangeTitle, onChangeContent, onSubmit, submitText = "작성"}) {
  return (
    <form onSubmit={onSubmit}>
      <label><strong className="!text-left block">제목</strong>
        <input className="border border-[#eee] rounded-[10px] mb-[15px] hover:bg-gray-50 p-1 block w-full"
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={onChangeTitle}
          required
        />
      </label>
      <label><strong className="!text-left block">내용</strong>
        <textarea className="border border-[#eee] rounded-[10px] mb-[15px] hover:bg-gray-50 p-1 block w-full"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={onChangeContent}
          rows={4}
          required
        />
      </label>
      <div className="!text-right">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{submitText}</button>
      </div>
    </form>
  );
}
