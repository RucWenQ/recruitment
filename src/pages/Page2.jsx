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
        <p className="note-text">
          请查看 5 名候选人的摘要信息，可点击查看完整简历与面试记录。
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
