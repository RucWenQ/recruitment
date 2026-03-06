import { useNavigate } from "react-router-dom";
import { CANDIDATES, PAGE_COPY } from "../constants.js";
import CandidateCard from "../components/CandidateCard.jsx";
import { useExperiment } from "../context/useExperiment.js";

function Page2() {
  const navigate = useNavigate();
  const {
    state: { group, candidateMaterialViews },
    markCandidateMaterialViewed,
  } = useExperiment();
  const pageCopy = PAGE_COPY.PAGE2;

  const handleViewCandidateDetail = (candidateId) => {
    markCandidateMaterialViewed(candidateId);
    navigate(`/page2/candidate/${candidateId}`);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="section-title">{pageCopy.TITLE}</h2>
        <p className="text-xl">{pageCopy.INTRO}</p>
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
                  ? pageCopy.VIEWED_LABEL
                  : pageCopy.VIEW_DETAIL_LABEL}
              </button>
            }
          />
        ))}
      </div>
      <p className="text-m">{pageCopy.FOOTER_HINT}</p>
      <div className="flex items-center justify-end">
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate(group === "control" ? "/page6" : "/page3")}
        >
          {pageCopy.NEXT_BUTTON}
        </button>
      </div>
    </div>
  );
}

export default Page2;
