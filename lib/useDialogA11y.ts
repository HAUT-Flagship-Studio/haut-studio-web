'use client'

import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * The keyboard contract every open dialog owes: focus moves inside it, Tab
 * cycles within it, Escape closes it, and focus returns to whatever opened it.
 *
 * Without this a keyboard or screen-reader user opening the quote modal keeps
 * focus on the button behind the overlay, and one Tab puts them in the page
 * they cannot see — on the form this site books work through.
 */
export function useDialogA11y(
  open: boolean,
  ref: RefObject<HTMLElement | null>,
  onClose: () => void
) {
  // Kept in a ref so a caller re-creating onClose each render does not tear the
  // listener down and yank focus back to the first control mid-typing.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const node = ref.current
    if (!open || !node) return

    const restoreTo = document.activeElement as HTMLElement | null
    const focusable = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      )

    // Focus the dialog itself rather than its first control: in the calculator
    // that control is "Reset", and landing on it means an Enter keystroke wipes
    // the form. A screen reader still announces the dialog and its label, and
    // the first Tab goes where it should.
    node.tabIndex = -1
    node.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const items = focusable()
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      const outside = !node!.contains(active)

      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      restoreTo?.focus?.()
    }
  }, [open, ref])
}
