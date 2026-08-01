'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import CalculatorModal, { type CalculatorPrefill } from './CalculatorModal'
import QuizModal from './QuizModal'

interface QuizContextValue {
  openQuiz: () => void
  closeQuiz: () => void
  openAssessment: () => void
  closeAssessment: () => void
}

const QuizContext = createContext<QuizContextValue | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [calculatorOpen, setCalculatorOpen] = useState(false)
  const [calculatorInitialStep, setCalculatorInitialStep] = useState(1)
  const [calculatorPrefill, setCalculatorPrefill] = useState<CalculatorPrefill | null>(null)
  const [assessmentOpen, setAssessmentOpen] = useState(false)

  const openQuiz = useCallback(() => {
    setCalculatorInitialStep(1)
    setCalculatorPrefill(null)
    setCalculatorOpen(true)
  }, [])
  const closeQuiz = useCallback(() => setCalculatorOpen(false), [])

  const openAssessment = useCallback(() => setAssessmentOpen(true), [])
  const closeAssessment = useCallback(() => setAssessmentOpen(false), [])

  const applyAssessmentToCalculator = useCallback((prefill: CalculatorPrefill) => {
    setCalculatorPrefill(prefill)
    setCalculatorInitialStep(3)
    setAssessmentOpen(false)
    setCalculatorOpen(true)
  }, [])

  return (
    <QuizContext.Provider value={{ openQuiz, closeQuiz, openAssessment, closeAssessment }}>
      {children}
      <CalculatorModal
        isOpen={calculatorOpen}
        onClose={closeQuiz}
        initialStep={calculatorInitialStep}
        prefill={calculatorPrefill}
      />
      <QuizModal isOpen={assessmentOpen} onClose={closeAssessment} onApply={applyAssessmentToCalculator} />
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within a QuizProvider')
  return ctx
}
