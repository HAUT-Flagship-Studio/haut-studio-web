import type { FeatureRow } from '@/lib/data'

export default function PricingMatrix({
  packages,
  features,
}: {
  packages: { id: string; name: string; price: number }[]
  features: FeatureRow[]
}) {
  return (
    <div className="overflow-x-auto card-folded bg-[#1A292E]/90 backdrop-blur border border-slate-800">
      <table className="w-full text-sm font-roboto min-w-[560px]">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="text-left text-[#DADADA]/60 font-normal py-5 px-6">Coverage</th>
            {packages.map((pkg) => (
              <th key={pkg.id} className="text-center py-5 px-4">
                <span className="block font-kanit font-bold text-white text-base">{pkg.name}</span>
                <span className="block font-kanit font-black text-[#9FFE0A] text-xl mt-1">
                  ${pkg.price.toLocaleString()}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {features.map((row) => (
            <tr key={row.label}>
              <td className="text-[#DADADA]/80 py-4 px-6">{row.label}</td>
              {row.included.map((yes, i) => (
                <td key={i} className="text-center py-4 px-4">
                  {yes ? (
                    <span className="text-[#9FFE0A] text-lg" aria-label="Included">✓</span>
                  ) : (
                    <span className="text-[#DADADA]/20 text-lg" aria-label="Not included">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
