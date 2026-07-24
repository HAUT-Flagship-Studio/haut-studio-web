'use client'

import { useQuiz } from './QuizProvider'

export default function QuoteButton({
  label = 'Get Custom Estimate →',
  className = 'btn-green px-6 py-3 text-sm rounded-none',
}: {
  label?: string
  className?: string
}) {
  const { openQuiz } = useQuiz()
  return (
    <button onClick={openQuiz} className={className}>
      {label}
    </button>
  )
}
