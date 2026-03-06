import { useState } from "react";

function CandidateCard({ candidate, footer }) {
  const [imageFailed, setImageFailed] = useState(false);

  const candidateName = candidate?.name || "";
  const initials = (() => {
    if (!candidateName) return "候";
    const letterMatch = candidateName.match(/[A-Za-z](?!.*[A-Za-z])/);
    if (letterMatch) return letterMatch[0].toUpperCase();
    return candidateName.slice(0, 1);
  })();

  const showImage = candidate?.avatar && !imageFailed;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-xl font-semibold text-slate-500">
          {showImage ? (
            <img
              src={candidate.avatar}
              alt={`${candidate?.name || "候选人"}头像`}
              className="h-full w-full object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            initials
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-slate-900">
              {candidate?.name || "候选人"}
            </h3>
            {candidate?.major && (
              <span
                className="badge max-w-[11rem] truncate"
                title={candidate.major}
              >
                {candidate.major}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {candidate?.gender || "性别未知"} ·{" "}
            {candidate?.college || "毕业院校待补充"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-center text-sm text-slate-600">
        <div className="rounded-xl bg-slate-50 px-2 py-2">
          笔试得分
          <div className="text-base font-semibold text-slate-900">
            {candidate?.scores?.score ?? "--"}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 px-2 py-2">
          性格测评
          <div className="text-base font-semibold text-slate-900">
            {candidate?.scores?.personality ?? "--"}
          </div>
        </div>
      </div>
      {footer && <div className="pt-2">{footer}</div>}
    </div>
  );
}

export default CandidateCard;
