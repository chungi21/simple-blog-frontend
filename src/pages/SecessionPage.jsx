import React from "react";
import { deleteMemberById } from "../api/memberApi";

export default function SecessionPage({ memberId }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteMemberById(memberId);
            alert("회원 탈퇴가 완료되었습니다.");
            // 예: 탈퇴 후 로그인 페이지로 이동
            window.location.href = "/login";
        } catch (err) {
            alert("회원 탈퇴 중 오류가 발생했습니다.");
            console.error(err);
        }
    };

    return (
        <>
            <div className="max-w-3xl mx-auto p-4 ">
                <div className="p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-3 !text-left">회원 탈퇴</h2>
                    <div className="!text-left mb-[10px]">
                        탈퇴하시면 작성하신 글과 댓글도 같이 삭제됩니다.<br />
                        삭제된 글과 댓글 복구가 불가능합니다.<br />
                        탈퇴하시겠습니까?
                    </div>


                    <form onSubmit={handleSubmit}>
                        <div className="!text-left  mb-[10px]">
                            <input type="checkbox" required /> 탈퇴에 동의합니다.
                        </div>
                        <div className="!text-right">
                            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">탈퇴하기</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}
