'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import CalculatorModal, { calculatorServiceFor, type CalculatorPrefill, type CalculatorService } from './CalculatorModal'
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
  const [calculatorService, setCalculatorService] = useState<CalculatorService>('ppf')
  const [assessmentOpen, setAssessmentOpen] = useState(false)

  const openQuiz = useCallback(() => {
    // Read at click time: the page decides which service the calculator leads with.
    setCalculatorService(calculatorServiceFor(window.location.pathname, window.location.search))
    setCalculatorInitialStep(1)
    setCalculatorPrefill(null)
    setCalculatorOpen(true)
  }, [])
  const closeQuiz = useCallback(() => setCalculatorOpen(false), [])

  const openAssessment = useCallback(() => setAssessmentOpen(true), [])
  const closeAssessment = useCallback(() => setAssessmentOpen(false), [])

  const applyAssessmentToCalculator = useCallback((prefill: CalculatorPrefill) => {
    // The assessment recommends PPF coverage, so its hand-off keeps the PPF layout.
    setCalculatorService('ppf')
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
        service={calculatorService}
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
