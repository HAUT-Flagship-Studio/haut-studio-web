export type VehicleCategory = 'sedan' | 'suv' | 'truck' | 'exotic' | 'cybertruck'

export type PriceTable = Record<VehicleCategory, number>

export interface ServiceOption {
  id: string
  name: string
  prices: PriceTable
}

export const CATEGORY_MULTIPLIERS: Record<VehicleCategory, number> = {
  sedan: 1.0,
  suv: 1.05,
  truck: 1.08,
  exotic: 1.1,
  cybertruck: 1.25,
}

export const BODY_TYPES: { id: VehicleCategory; label: string }[] = [
  { id: 'sedan', label: 'Sedan / Coupe' },
  { id: 'suv', label: 'SUV / Crossover' },
  { id: 'truck', label: 'Truck / Pickup' },
  { id: 'exotic', label: 'Exotic / Supercar' },
  { id: 'cybertruck', label: 'Tesla Cybertruck' },
]

export const PPF: Record<'bikini' | 'frontEnd' | 'highway' | 'fullBody', ServiceOption> = {
  bikini: { id: 'ppf-bikini', name: 'Bikini PPF', prices: { sedan: 1399, suv: 1469, truck: 1511, exotic: 1539, cybertruck: 1119 } },
  frontEnd: { id: 'ppf-front-end', name: 'Front End PPF', prices: { sedan: 2399, suv: 2519, truck: 2591, exotic: 2639, cybertruck: 1919 } },
  highway: { id: 'ppf-highway', name: 'Highway PPF', prices: { sedan: 3199, suv: 3359, truck: 3455, exotic: 3519, cybertruck: 2559 } },
  fullBody: { id: 'ppf-full-body', name: 'Full Body PPF', prices: { sedan: 6499, suv: 6824, truck: 7019, exotic: 7149, cybertruck: 5199 } },
}

// Cybertruck-exclusive upgrade — a full vehicle color-change film, offered
// alongside (not instead of) the Clear PPF tiers above. Same flat price
// regardless of category since it is never selectable outside 'cybertruck'.
export const PPF_CYBERTRUCK_COLOR: ServiceOption = {
  id: 'ppf-color-cybertruck',
  name: 'Color PPF (Full Vehicle Change)',
  prices: { sedan: 6500, suv: 6500, truck: 6500, exotic: 6500, cybertruck: 6500 },
}

export type PPFChoice = 'none' | keyof typeof PPF | 'colorPPF'

export function resolvePPFOption(choice: PPFChoice): ServiceOption | null {
  if (choice === 'none') return null
  if (choice === 'colorPPF') return PPF_CYBERTRUCK_COLOR
  return PPF[choice]
}

export const CERAMIC: Record<'wheels' | 'body' | 'interior', ServiceOption> = {
  wheels: { id: 'ceramic-wheels', name: 'Ceramic Wheel Coating', prices: { sedan: 399, suv: 419, truck: 431, exotic: 439, cybertruck: 499 } },
  body: { id: 'ceramic-body', name: 'Ceramic Coating (Body)', prices: { sedan: 999, suv: 1049, truck: 1079, exotic: 1099, cybertruck: 1249 } },
  interior: { id: 'ceramic-interior', name: 'Ceramic Interior Coating', prices: { sedan: 699, suv: 734, truck: 755, exotic: 769, cybertruck: 874 } },
}

export const TINT: Record<'twoFront' | 'windshieldOnly' | 'rearHalf' | 'fullCabin', ServiceOption> = {
  twoFront: { id: 'tint-two-front', name: '2 Front Windows Tint', prices: { sedan: 199, suv: 209, truck: 215, exotic: 219, cybertruck: 249 } },
  windshieldOnly: { id: 'tint-windshield-only', name: 'Windshield Tint', prices: { sedan: 299, suv: 314, truck: 323, exotic: 329, cybertruck: 374 } },
  rearHalf: { id: 'tint-rear-half', name: 'Rear Half Tint', prices: { sedan: 599, suv: 629, truck: 647, exotic: 659, cybertruck: 749 } },
  fullCabin: { id: 'tint-full-cabin', name: 'Full Cabin Ceramic Tint', prices: { sedan: 799, suv: 839, truck: 863, exotic: 879, cybertruck: 999 } },
}

export const WSPF: Record<'windshieldArmor', ServiceOption> = {
  windshieldArmor: { id: 'wspf-windshield-armor', name: 'Windshield Armor (WSPF)', prices: { sedan: 799, suv: 839, truck: 863, exotic: 879, cybertruck: 999 } },
}

function cheapestPrice(options: Record<string, ServiceOption>): number {
  return Math.min(...Object.values(options).flatMap((o) => Object.values(o.prices)))
}

export const CHEAPEST_PPF_PRICE = cheapestPrice(PPF)
export const CHEAPEST_CERAMIC_PRICE = cheapestPrice(CERAMIC)
export const CHEAPEST_TINT_PRICE = cheapestPrice(TINT)
