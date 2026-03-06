import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEMOGRAPHIC_OPTIONS, INSTRUCTIONS, PAGE_COPY } from "../constants.js";
import { useExperiment } from "../context/useExperiment.js";

const DEMO_OPTIONS = DEMOGRAPHIC_OPTIONS;
const PHONE_PATTERN = /^\d{11}$/;

function Page0() {
  const navigate = useNavigate();
  const { state, updateDemographics, assignRandomGroup } = useExperiment();
  const { demographics, group } = state;
  const pageCopy = PAGE_COPY.PAGE0;

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
        <h2 className="section-title">{pageCopy.CONSENT_TITLE}</h2>
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
          {pageCopy.CONSENT_CHECKBOX_LABEL}
        </label>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="section-title">{pageCopy.PROFILE_TITLE}</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-2">
            <span className="field-label">{pageCopy.GENDER_LABEL}</span>
            <select
              className="input-base"
              value={demographics.gender}
              onChange={(event) =>
                updateDemographics({ gender: event.target.value })
              }
            >
              <option value="">{pageCopy.EMPTY_OPTION}</option>
              {DEMO_OPTIONS.GENDER.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="field-label">{pageCopy.AGE_LABEL}</span>
            <input
              type="number"
              min="15"
              max="80"
              placeholder={pageCopy.AGE_PLACEHOLDER}
              className="input-base"
              value={demographics.age}
              onChange={(event) =>
                updateDemographics({ age: event.target.value })
              }
            />
          </label>
          <label className="space-y-2">
            <span className="field-label">{pageCopy.EDUCATION_LABEL}</span>
            <select
              className="input-base"
              value={demographics.education}
              onChange={(event) =>
                updateDemographics({ education: event.target.value })
              }
            >
              <option value="">{pageCopy.EMPTY_OPTION}</option>
              {DEMO_OPTIONS.EDUCATION.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="field-label">{pageCopy.PHONE_LABEL}</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder={pageCopy.PHONE_PLACEHOLDER}
              className="input-base"
              value={phone}
              onChange={(event) =>
                updateDemographics({
                  phone: event.target.value.replace(/\D/g, "").slice(0, 11),
                })
              }
            />
            {phone && !isPhoneValid && (
              <p className="note-text text-rose-600">{pageCopy.PHONE_ERROR}</p>
            )}
          </label>
        </div>
      </section>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="body-text font-medium">{pageCopy.START_TITLE}</p>
          <p className="note-text">{pageCopy.START_HINT}</p>
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
          {pageCopy.NEXT_BUTTON}
        </button>
      </div>
    </div>
  );
}

export default Page0;
