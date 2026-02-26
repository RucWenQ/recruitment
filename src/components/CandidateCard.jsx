import { useMemo, useState } from 'react'

function CandidateCard({ candidate, footer }) {
  const [imageFailed, setImageFailed] = useState(false)

  const initials = useMemo(() => {
    if (!candidate?.name) return '候'
    return candidate.name.slice(0, 1)
  }, [candidate])

  const showImage = candidate?.avatar && !imageFailed

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-lg font-semibold text-slate-500">
          {showImage ? (
            <img
              src={candidate.avatar}
              alt={`${candidate?.name || '候选人'}头像`}
              className="h-full w-full object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            initials
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              {candidate?.name || '候选人'}
            </h3>
            {candidate?.degree && <span className="badge">{candidate.degree}</span>}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {candidate?.gender || '性别未知'} · {candidate?.college || '毕业院校待补充'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-600">
        <div className="rounded-xl bg-slate-50 px-2 py-2">
          文字能力
          <div className="text-sm font-semibold text-slate-900">
            {candidate?.scores?.verbal ?? '--'}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 px-2 py-2">
          逻辑推理
          <div className="text-sm font-semibold text-slate-900">
            {candidate?.scores?.logic ?? '--'}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 px-2 py-2">
          性格测评
          <div className="text-sm font-semibold text-slate-900">
            {candidate?.scores?.personality ?? '--'}
          </div>
        </div>
      </div>
      {footer && <div className="pt-2">{footer}</div>}
    </div>
  )
}

export default CandidateCard