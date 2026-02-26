import { Link, useNavigate } from "react-router-dom";
import { CANDIDATES } from "../constants.js";
import CandidateCard from "../components/CandidateCard.jsx";

function Page2() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">候选人介绍</h2>
        <p className="text-sm text-slate-500">
          请查看 5 名候选人的摘要信息，可进入完整简历与 AI 面试文本页面。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CANDIDATES.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            footer={
              <Link
                to={`/page2/candidate/${candidate.id}`}
                className="btn-secondary w-full"
              >
                查看完整简历与面试记录
              </Link>
            }
          />
        ))}
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("/page3")}
        >
          进入 AI 调试
        </button>
      </div>
    </div>
  );
}

export default Page2;
