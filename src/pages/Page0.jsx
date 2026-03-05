import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEMOGRAPHIC_OPTIONS, INSTRUCTIONS } from "../constants.js";
import { useExperiment } from "../context/useExperiment.js";

const DEMO_OPTIONS = DEMOGRAPHIC_OPTIONS;
const PHONE_PATTERN = /^\d{11}$/;

function Page0() {
  const navigate = useNavigate();
  const { state, updateDemographics, assignRandomGroup } = useExperiment();
  const { demographics, group } = state;
  const [consented, setConsented] = useState(false);
  const phone = demographics.phone || "";
  const isPhoneValid = PHONE_PATTERN.test(phone);

  const isComplete =
    consented &&
    demographics.gender &&
    demographics.age &&
    demographics.education &&
    isPhoneValid;

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="section-title">知情同意书</h2>
        {/* <p className="text-sm text-slate-600">
          请仔细阅读知情同意书，确认后进入信息登记。
        </p> */}
        <div className="body-text rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {INSTRUCTIONS.CONSENT_TEXT}
        </div>
        <label className="field-label flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-slate-900"
            checked={consented}
            onChange={(event) => setConsented(event.target.checked)}
          />
          我已知晓并同意参与本实验
        </label>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="section-title">个人信息登记</h2>
          {/* <p className="section-subtitle">请填写基本信息，用于统计分析。</p> */}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-2">
            <span className="field-label">性别</span>
            <select
              className="input-base"
              value={demographics.gender}
              onChange={(event) =>
                updateDemographics({ gender: event.target.value })
              }
            >
              <option value="">请选择</option>
              {DEMO_OPTIONS.GENDER.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="field-label">年龄</span>
            <input
              type="number"
              min="15"
              max="80"
              placeholder="请输入您的年龄"
              className="input-base"
              value={demographics.age}
              onChange={(event) =>
                updateDemographics({ age: event.target.value })
              }
            />
          </label>
          <label className="space-y-2">
            <span className="field-label">受教育水平</span>
            <select
              className="input-base"
              value={demographics.education}
              onChange={(event) =>
                updateDemographics({ education: event.target.value })
              }
            >
              <option value="">请选择</option>
              {DEMO_OPTIONS.EDUCATION.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="field-label">手机号</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="请输入11位手机号"
              className="input-base"
              value={phone}
              onChange={(event) =>
                updateDemographics({
                  phone: event.target.value.replace(/\D/g, "").slice(0, 11),
                })
              }
            />
            {phone && !isPhoneValid && (
              <p className="note-text text-rose-600">手机号需为11位数字</p>
            )}
          </label>
        </div>
      </section>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="body-text font-medium">
            完成知情同意并填写个人信息后进入任务介绍
          </p>
          <p className="note-text">
            完成实验后被试费将发放至您手机号绑定的支付宝账户，请务必准确填写
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          disabled={!isComplete}
          onClick={() => {
            if (!group) {
              assignRandomGroup();
            }
            navigate("/page1");
          }}
        >
          下一步
        </button>
      </div>
    </div>
  );
}

export default Page0;

