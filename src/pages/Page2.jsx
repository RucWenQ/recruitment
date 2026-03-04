import { Link, useNavigate } from "react-router-dom";
import { CANDIDATES } from "../constants.js";
import CandidateCard from "../components/CandidateCard.jsx";
import { useExperiment } from "../context/ExperimentContext.jsx";

function Page2() {
  const navigate = useNavigate();
  const {
    state: { group },
  } = useExperiment();

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
          onClick={() => navigate(group === "control" ? "/page6" : "/page3")}
        >
          {group === "control" ? "下一步" : "下一步"}
        </button>
      </div>
    </div>
  );
}

export default Page2;
