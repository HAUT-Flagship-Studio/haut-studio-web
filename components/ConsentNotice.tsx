/**
 * TCPA consent, under every phone field that leads to a call or a text.
 *
 * A notice, not a checkbox: submitting is the agreement, which keeps the form
 * one tap long. The wording names who will contact them, how (calls and texts,
 * including automated), that consent is not required to buy, and how to stop —
 * the parts a consent is judged on. The same wording is quoted in /privacy.
 *
 * The links open in a new tab so the estimate on screen is not lost.
 */
export default function ConsentNotice({ action = 'submitting' }: { action?: string }) {
  return (
    <p className="font-roboto text-[#DADADA]/60 text-[11px] leading-relaxed">
      By {action}, you agree that HAUT Flagship Studio may call and text you at the number provided about your
      estimate and appointment, including by automated means. Consent is not a condition of purchase. Msg &amp; data
      rates may apply; frequency varies. Reply STOP to opt out, HELP for help. See our{' '}
      <a href="/privacy" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#9FFE0A]">
        Privacy Policy
      </a>{' '}
      and{' '}
      <a href="/terms" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#9FFE0A]">
        Terms
      </a>
      .
    </p>
  )
}
