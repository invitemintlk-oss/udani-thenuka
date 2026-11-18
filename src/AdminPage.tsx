import { useState } from "react";
import {
  BRIDE_NAME,
  GROOM_NAME,
  PREFIXES,
  type Prefix,
  buildDisplayName,
  buildGreeting,
  buildInviteLink,
  buildInviteMessage,
} from "./guest";

const fieldClass =
  "w-full rounded-lg border border-[#d9c9a3] bg-white px-3 py-2.5 text-sm text-[#3f4a38] focus:border-[#b8933f] focus:outline-none focus:ring-2 focus:ring-[#b8933f]/25";
const labelClass = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b5a3a]";

export default function AdminPage() {
  const [baseUrl, setBaseUrl] = useState(window.location.origin);
  const [prefix, setPrefix] = useState<Prefix>("Mr.");
  const [guestName, setGuestName] = useState("");
  const [generated, setGenerated] = useState<{ displayName: string; link: string; message: string } | null>(null);
  const [toast, setToast] = useState("");

  const generate = () => {
    const displayName = buildDisplayName(prefix, guestName);
    if (!displayName) {
      setGenerated(null);
      setToast("Please enter a guest name");
      setTimeout(() => setToast(""), 2000);
      return;
    }
    const link = buildInviteLink(baseUrl, displayName);
    setGenerated({ displayName, link, message: buildInviteMessage(displayName, link) });
  };

  const copy = async (text: string, note: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for browsers/contexts without the async clipboard API
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setToast(note);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <main className="min-h-screen bg-[#f6f0e3] px-4 py-10 font-montserrat text-[#3f4a38]">
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-8 text-center">
          <p className="font-script text-4xl text-[#a07c34]">
            {BRIDE_NAME} &amp; {GROOM_NAME}
          </p>
          <h1 className="mt-2 font-cinzel text-sm font-bold uppercase tracking-[0.3em] text-[#3f4a38]">
            Invitation Link Generator
          </h1>
        </header>

        <section className="space-y-5 rounded-2xl border border-[#e3d5b3] bg-white/80 p-6 shadow-sm">
          <div>
            <label className={labelClass} htmlFor="base-url">Website link</label>
            <input id="base-url" className={fieldClass} value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} />
          </div>

          <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
            <div>
              <label className={labelClass} htmlFor="prefix">Select prefix</label>
              <select id="prefix" className={fieldClass} value={prefix} onChange={(e) => setPrefix(e.target.value as Prefix)}>
                {PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="guest">Guest name</label>
              <input
                id="guest"
                className={fieldClass}
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generate()}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={generate}
            className="w-full rounded-xl bg-[#4f6444] py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#fbf1d6] transition-colors hover:bg-[#43573a]"
          >
            Generate Link
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && copy(generated.link, "Link copied!")}
              className="rounded-xl border border-[#b8933f] py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6e5320] transition-colors hover:bg-[#f6ecd3] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Copy Link Only
            </button>
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && copy(generated.message, "Message copied!")}
              className="rounded-xl border border-[#b8933f] bg-[#f6ecd3] py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6e5320] transition-colors hover:bg-[#efdfb8] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Copy Full Message
            </button>
          </div>
        </section>

        {generated && (
          <section className="mt-6 space-y-4 rounded-2xl border border-[#e3d5b3] bg-white/80 p-6 shadow-sm">
            <div>
              <p className={labelClass}>Greeting</p>
              <p className="font-serif text-2xl text-[#a07c34]">{buildGreeting(generated.displayName)}</p>
            </div>
            <div>
              <p className={labelClass}>Invitation link</p>
              <a href={generated.link} target="_blank" rel="noreferrer" className="block break-all rounded-lg bg-[#f6f0e3] px-3 py-2 font-mono text-xs text-[#4f6444] underline">
                {generated.link}
              </a>
            </div>
            <div>
              <p className={labelClass}>Full message preview</p>
              <pre className="whitespace-pre-wrap rounded-lg bg-[#f6f0e3] p-4 font-montserrat text-[13px] leading-relaxed text-[#3f4a38]">
                {generated.message}
              </pre>
            </div>
          </section>
        )}
      </div>

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[#3f4a38] px-5 py-2.5 text-xs font-semibold tracking-wide text-[#fbf1d6] shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
