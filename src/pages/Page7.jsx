import { PAGE_COPY, QUESTIONNAIRE_CONFIG } from "../constants.js";

function Page7() {
  const pageCopy = PAGE_COPY.PAGE7;
  const linkUrl = String(QUESTIONNAIRE_CONFIG.LINK_URL || "").trim();
  const qrImageUrl = String(QUESTIONNAIRE_CONFIG.QR_IMAGE_URL || "").trim();
  const hasLink = Boolean(linkUrl);
  const hasQr = Boolean(qrImageUrl);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="section-title">{pageCopy.TITLE}</h2>
        <p className="body-text">{pageCopy.INTRO}</p>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="subsection-title">{pageCopy.LINK_TITLE}</h3>
        {hasLink ? (
          <a
            href={linkUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            {pageCopy.OPEN_LINK_BUTTON}
          </a>
        ) : (
          <div className="space-y-2">
            <p className="note-text">{pageCopy.LINK_EMPTY_HINT}</p>
            <button type="button" className="btn-primary" disabled>
              {pageCopy.OPEN_LINK_BUTTON}
            </button>
          </div>
        )}
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="subsection-title">{pageCopy.QR_TITLE}</h3>
        {hasQr ? (
          <div className="w-full max-w-[260px] rounded-2xl border border-slate-200 bg-white p-3">
            <img
              src={qrImageUrl}
              alt={pageCopy.QR_ALT}
              className="h-auto w-full rounded-xl object-contain"
            />
          </div>
        ) : (
          <div className="flex h-[260px] w-full max-w-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-center">
            <p className="note-text">{pageCopy.QR_EMPTY_HINT}</p>
          </div>
        )}
      </section>

      <p className="note-text">{pageCopy.FINISH_HINT}</p>
    </div>
  );
}

export default Page7;
