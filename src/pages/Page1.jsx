import { useNavigate } from "react-router-dom";
import { INSTRUCTIONS, JOB_DESCRIPTIONS } from "../constants.js";

function Page1() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="section-title">任务介绍</h2>
        <p className="body-text">{INSTRUCTIONS.TASK_INTRO}</p>
      </section>

      <section className="space-y-3">
        <h3 className="subsection-title">企业介绍</h3>
        <div className="body-text rounded-2xl border border-slate-200 bg-white p-4">
          <p className="font-medium text-slate-900">
            {INSTRUCTIONS.COMPANY_INFO.NAME}
          </p>
          <p className="mt-1">所在地：{INSTRUCTIONS.COMPANY_INFO.LOCATION}</p>
          <p>主营业务：{INSTRUCTIONS.COMPANY_INFO.BUSINESS}</p>
          <p>规模：{INSTRUCTIONS.COMPANY_INFO.SCALE}</p>
          <p className="note-text mt-2">{INSTRUCTIONS.COMPANY_INFO.DESC}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="subsection-title">岗位描述</h3>
        <div className="space-y-3">
          {JOB_DESCRIPTIONS.map((job) => (
            <div
              key={job.id}
              className={`body-text rounded-2xl border p-4 ${
                job.isTarget
                  ? "border-slate-200 bg-white text-slate-700"
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
          下一步
        </button>
      </div>
    </div>
  );
}

export default Page1;
