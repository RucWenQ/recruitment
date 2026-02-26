import { useNavigate } from "react-router-dom";
import { INSTRUCTIONS, JOB_DESCRIPTIONS } from "../constants.js";

function Page1() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="section-title">任务介绍</h2>
        <p className="text-sm text-slate-600">{INSTRUCTIONS.TASK_INTRO}</p>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-semibold text-slate-900">企业介绍</h3>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">{INSTRUCTIONS.COMPANY_INFO.NAME}</p>
          <p className="mt-1">所在地：{INSTRUCTIONS.COMPANY_INFO.LOCATION}</p>
          <p>主营业务：{INSTRUCTIONS.COMPANY_INFO.BUSINESS}</p>
          <p>规模：{INSTRUCTIONS.COMPANY_INFO.SCALE}</p>
          <p className="mt-2 text-slate-500">{INSTRUCTIONS.COMPANY_INFO.DESC}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-semibold text-slate-900">岗位描述</h3>
        <div className="space-y-3">
          {JOB_DESCRIPTIONS.map((job) => (
            <div
              key={job.id}
              className={`rounded-2xl border p-4 text-sm ${
                job.isTarget
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              <p className="font-semibold">{job.title}</p>
              <p className="mt-2 opacity-90">{job.requirement}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-end">
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("/page2")}
        >
          查看候选人信息
        </button>
      </div>
    </div>
  );
}

export default Page1;