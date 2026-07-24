'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import QuizModal from './QuizModal'

interface QuizContextValue {
  openQuiz: () => void
  closeQuiz: () => void
}

const QuizContext = createContext<QuizContextValue | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const openQuiz = useCallback(() => setIsOpen(true), [])
  const closeQuiz = useCallback(() => setIsOpen(false), [])

  return (
    <QuizContext.Provider value={{ openQuiz, closeQuiz }}>
      {children}
      <QuizModal isOpen={isOpen} onClose={closeQuiz} />
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within a QuizProvider')
  return ctx
}
