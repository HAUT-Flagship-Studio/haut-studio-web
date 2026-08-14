'use client'

import { useQuiz } from './QuizProvider'

export default function PPFFinalCTA() {
  const { openAssessment } = useQuiz()

  return (
    <section
      className="bg-[#1A292E] precision-grid py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Find your ideal PPF package"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-kanit font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
          Not Sure Which Package
          <br />
          <span className="text-[#9FFE0A]">Fits Your Vehicle?</span>
        </h2>
        <p className="font-roboto text-[#DADADA]/70 text-base leading-relaxed mb-8">
          Answer a few quick questions about your vehicle and driving habits — get a tailored
          coverage recommendation in about 2 minutes.
        </p>
        <button
          type="button"
          onClick={openAssessment}
          className="btn-green px-8 py-4 text-sm tracking-wider rounded-none inline-flex items-center gap-2"
          id="ppf-final-cta-quiz"
        >
          <span>+ Find Your Ideal PPF Package (2-Min Assessment)</span>
        </button>
      </div>
    </section>
  )
}
