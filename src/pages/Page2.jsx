import { useNavigate } from "react-router-dom";
import { CANDIDATES } from "../constants.js";
import CandidateCard from "../components/CandidateCard.jsx";
import { useExperiment } from "../context/useExperiment.js";

function Page2() {
  const navigate = useNavigate();
  const {
    state: { group, candidateMaterialViews },
    markCandidateMaterialViewed,
  } = useExperiment();

  const handleViewCandidateDetail = (candidateId) => {
    markCandidateMaterialViewed(candidateId);
    navigate(`/page2/candidate/${candidateId}`);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">候选人介绍</h2>
        <p className="text-xl">
          以下是同时投递了两个岗位的5名候选人的摘要信息，可点击每个候选人下方的按钮查看他们的完整简历与面试记录。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CANDIDATES.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            footer={
              <button
                type="button"
                className="btn-secondary w-full"
                onClick={() => handleViewCandidateDetail(candidate.id)}
              >
                {candidateMaterialViews?.[candidate.id]
                  ? "已查看完整材料"
                  : "查看完整简历与面试记录"}
              </button>
            }
          />
        ))}
      </div>
      <p className="text-m">
        如果您已经了解候选人的相关信息，可点击“下一步”继续实验
      </p>
      <div className="flex items-center justify-end">
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate(group === "control" ? "/page6" : "/page3")}
        >
          下一步
        </button>
      </div>
    </div>
  );
}

export default Page2;
