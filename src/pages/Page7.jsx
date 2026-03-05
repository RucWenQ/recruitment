import { QUESTIONNAIRE_CONFIG } from "../constants.js";

function Page7() {
  const linkUrl = String(QUESTIONNAIRE_CONFIG.LINK_URL || "").trim();
  const qrImageUrl = String(QUESTIONNAIRE_CONFIG.QR_IMAGE_URL || "").trim();
  const hasLink = Boolean(linkUrl);
  const hasQr = Boolean(qrImageUrl);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="section-title">问卷填写</h2>
        <p className="body-text">
          请继续填写后续问卷，以完成全部实验，您可以选择扫码填写或点击链接跳转至问卷页面。
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="subsection-title">问卷链接</h3>
        {hasLink ? (
          <a
            href={linkUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            打开问卷链接
          </a>
        ) : (
          <div className="space-y-2">
            <p className="note-text">
              请在 `QUESTIONNAIRE_CONFIG.LINK_URL` 中填写问卷链接。
            </p>
            <button type="button" className="btn-primary" disabled>
              打开问卷链接
            </button>
          </div>
        )}
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="subsection-title">问卷二维码</h3>
        {hasQr ? (
          <div className="w-full max-w-[260px] rounded-2xl border border-slate-200 bg-white p-3">
            <img
              src={qrImageUrl}
              alt="问卷二维码"
              className="h-auto w-full rounded-xl object-contain"
            />
          </div>
        ) : (
          <div className="flex h-[260px] w-full max-w-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-center">
            <p className="note-text">
              请在 `QUESTIONNAIRE_CONFIG.QR_IMAGE_URL` 中填写二维码图片地址。
            </p>
          </div>
        )}
      </section>

      <p className="note-text">
        完成问卷后可关闭本页面，被试费将在一周内发放至您手机号对应的支付宝账户。
      </p>
    </div>
  );
}

export default Page7;
