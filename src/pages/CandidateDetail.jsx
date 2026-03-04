import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CANDIDATES } from "../constants.js";

function CandidateDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const candidate = useMemo(
    () => CANDIDATES.find((item) => String(item.id) === String(id)),
    [id],
  );

  if (!candidate) {
    return (
      <div className="space-y-4">
        <h2 className="section-title">未找到候选人</h2>
        <p className="text-sm text-slate-600">请返回候选人列表重新选择。</p>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/page2")}
        >
          返回候选人列表
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="section-title">{candidate.name} · 详细材料</h2>
          {/* <p className="section-subtitle">基础信息与面试内容</p> */}
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate(-1)}
        >
          返回当前界面
        </button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-xs text-slate-500">性别</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {candidate.gender || "待补充"}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-xs text-slate-500">毕业院校</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {candidate.college || "待补充"}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-xs text-slate-500">所学专业</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {candidate.major || "待补充"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-700">完整简历</h3>
          <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
            {candidate.resumeFull || "材料待补充"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-700">AI 面试记录</h3>
          <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
            {candidate.interviewTranscript || "材料待补充"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetail;
