/**
 * A field no person sees or reaches with Tab, so only a bot fills it. Read on
 * submit from the form itself — see lib/leadGuard.ts.
 */
export default function LeadHoneypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label>
        Fax
        <input name="fax" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}

/** The honeypot's value from a submitted form. */
export function honeypotValue(form: HTMLFormElement): string {
  return String(new FormData(form).get('fax') ?? '')
}
