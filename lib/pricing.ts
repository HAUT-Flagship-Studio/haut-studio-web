/**
 * PPF is priced in four vehicle classes (owner's grid, 2026-11-22): each class
 * is about 30% above the one before, rounded to end in 99. Ceramic, tint and
 * windshield film did not change: Tesla and Regular keep the old sedan price,
 * Regular SUV the old SUV price, Exotic the old exotic price. Pickups and the
 * Cybertruck now sit in Regular SUV.
 */
export type VehicleCategory = 'tesla' | 'regular' | 'regularSuv' | 'exotic'

export type PriceTable = Record<VehicleCategory, number>

export interface ServiceOption {
  id: string
  name: string
  prices: PriceTable
}

export const BODY_TYPES: { id: VehicleCategory; label: string; examples: string }[] = [
  { id: 'tesla', label: 'Tesla', examples: 'Any Tesla except the Cybertruck' },
  { id: 'regular', label: 'Regular (Sedan / Coupe)', examples: 'BMW, Mercedes-Benz, Audi, Lexus, Genesis, Acura sedans, coupes and wagons' },
  { id: 'regularSuv', label: 'Regular SUV', examples: 'SUVs, crossovers, pickups, Cybertruck — BMW X3–X7, GLE, Q7, Cayenne, Macan, Range Rover Sport' },
  { id: 'exotic', label: 'Exotic & Huge SUV', examples: 'Ferrari, Lamborghini, McLaren, Porsche 911, Rolls-Royce, Bentley, G-Class, Escalade, Range Rover' },
]

export const PPF: Record<'frontEnd' | 'highway' | 'fullBody', ServiceOption> = {
  frontEnd: { id: 'ppf-front-end', name: 'Front End PPF', prices: { tesla: 2399, regular: 3099, regularSuv: 4099, exotic: 5299 } },
  highway: { id: 'ppf-highway', name: 'Highway PPF', prices: { tesla: 3199, regular: 4199, regularSuv: 5399, exotic: 7099 } },
  fullBody: { id: 'ppf-full-body', name: 'Full Body PPF', prices: { tesla: 6499, regular: 8499, regularSuv: 10999, exotic: 14299 } },
}

export type PPFChoice = 'none' | keyof typeof PPF

export function resolvePPFOption(choice: PPFChoice): ServiceOption | null {
  if (choice === 'none') return null
  return PPF[choice]
}

/** Old sedan / SUV / exotic prices carried onto the four classes. */
const carry = (sedan: number, suv: number, exotic: number): PriceTable => ({ tesla: sedan, regular: sedan, regularSuv: suv, exotic })

export const CERAMIC: Record<'wheels' | 'body' | 'interior', ServiceOption> = {
  wheels: { id: 'ceramic-wheels', name: 'Ceramic Wheel Coating', prices: carry(399, 419, 439) },
  body: { id: 'ceramic-body', name: 'Ceramic Coating (Body)', prices: carry(999, 1049, 1099) },
  interior: { id: 'ceramic-interior', name: 'Ceramic Interior Coating', prices: carry(699, 734, 769) },
}

export const TINT: Record<'twoFront' | 'windshieldOnly' | 'rearHalf' | 'fullCabin', ServiceOption> = {
  twoFront: { id: 'tint-two-front', name: '2 Front Windows Tint', prices: carry(199, 209, 219) },
  windshieldOnly: { id: 'tint-windshield-only', name: 'Windshield Tint', prices: carry(299, 314, 329) },
  rearHalf: { id: 'tint-rear-half', name: 'Rear Half Tint', prices: carry(599, 629, 659) },
  fullCabin: { id: 'tint-full-cabin', name: 'Full Cabin Ceramic Tint', prices: carry(799, 839, 879) },
}

export const WSPF: Record<'windshieldArmor', ServiceOption> = {
  windshieldArmor: { id: 'wspf-windshield-armor', name: 'Windshield Armor (WSPF)', prices: carry(799, 839, 879) },
}

function cheapestPrice(options: Record<string, ServiceOption>): number {
  return Math.min(...Object.values(options).flatMap((o) => Object.values(o.prices)))
}

// "From" prices for the service cards and llms.txt. They follow the headline
// service (Tesla-class Front End PPF, Regular body ceramic), not the cheapest line in
// the calculator — otherwise wheel ceramic ($399) would advertise prices that /ppf, /ceramic and the Google profile never show.
export const PPF_FROM_PRICE = PPF.frontEnd.prices.tesla
export const CERAMIC_FROM_PRICE = CERAMIC.body.prices.regular
export const TINT_FROM_PRICE = cheapestPrice(TINT)
