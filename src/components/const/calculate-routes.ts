interface Route {
  from: string
  to: string
  rateCarton: number
  weightRatio: number
}

// DTHC не учитываем, т.к. нет доставки через порт
export const ROUTES: Route[] = [
  { from: 'Hefei', to: 'Moscow', rateCarton: 100, weightRatio: 500 },
  { from: 'Suzhou', to: 'Moscow', rateCarton: 100, weightRatio: 500 },
  { from: 'Suzhou', to: 'Saint Petersburg', rateCarton: 100, weightRatio: 500 },
  { from: 'Chongqing-manzhouli', to: 'Moscow', rateCarton: 85, weightRatio: 500 },
  { from: 'Xi\'an-Manzhouli', to: 'Moscow', rateCarton: 90, weightRatio: 500 },
  { from: 'Xi\'an-Manzhouli', to: 'Saint Petersburg', rateCarton: 85, weightRatio: 500 },
  { from: 'Chongqing-Manzhouli', to: 'Saint Petersburg', rateCarton: 80, weightRatio: 500 },
  { from: 'Xian-Khorgos/Alashankou', to: 'Moscow', rateCarton: 90, weightRatio: 500 },
]

export interface ShippingParams {
  from: string
  to: string
  cargoType: string
  volumeCBM: number
  weight: number
  customsIncluded: boolean
  insurance: boolean
}

export function calculateShippingCost(params: ShippingParams) {
  // Поиск подходящего маршрута
  const route = ROUTES.find(r =>
    params.from.startsWith(r.from.split('-')[0])
    && r.to === params.to,
  )

  if (!route) {
    throw new Error('Маршрут не найден')
  }

  // Объёмный вес (в CBM эквиваленте)
  const volumeWeight = params.weight / route.weightRatio

  const chargeableVolume = Math.max(params.volumeCBM, volumeWeight)
  const cost = chargeableVolume * route.rateCarton

  return Number.parseFloat(cost.toFixed(2))
}
