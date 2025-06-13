import type { CargoType } from "@/shared/types/cargo";

interface Route {
  from: string;
  to: string;
  rates: {
    carton: number;    // USD/CBM (для коробок)
    other: number;     // USD/CBM (другая упаковка)
  };
  dthc?: number;       // Доп. сбор (USD/BL)
  weightRule?: string;  // Правило веса (например, "1CBM = 500KG")
  deliveryTime?: string; // Срок доставки (например, "12-25 дней")
  remarks: string[];    // Особые условия
}


const routes: Route[] = [
  {
    from: 'Hefei',
    to: 'Moscow',
    rates: { carton: 100, other: 115 },
    remarks: [
      'Include one export cc and one set IS file',
    ],
  },
  {
    from: 'Suzhou',
    to: 'Moscow',
    rates: { carton: 100, other: 115 },
    remarks: [
      'Min 1CBM',
    ],
  },
  {
    from: 'Suzhou',
    to: 'Saint Petersburg',
    rates: { carton: 100, other: 115 },
    remarks: [
      '3 days free storage in warehouse (Yekaterinburg: 2 days free)',
    ],
  },
  {
    from: 'Chongqing-Manzhouli',
    to: 'Moscow',
    rates: { carton: 85, other: 100 },
    dthc: 150, // USD/BL
    weightRule: '1CBM = 500KG',
    remarks: [
      'Via KZH: customs transfer fee 50USD/IS',
    ],
  },
  {
    from: 'Xi’an-Manzhouli',
    to: 'Moscow',
    rates: { carton: 90, other: 105 },
    deliveryTime: '12-25 days',
    remarks: [
      'Accept general cargo only',
      'For cargo >3000KG or size >3m: extra charges apply',
    ],
  },
  {
    from: 'Xi’an-Manzhouli',
    to: 'Moscow',
    rates: { carton: 85, other: 105 },
    remarks: [
      'For non-stackable cargo: contact manager',
      'Kaliningrad: extra charges if weight >1.5T',
    ],
  },
  {
    from: 'Chongqing-Manzhouli',
    to: 'Moscow',
    rates: { carton: 80, other: 95 },
    remarks: [
      'For non-stackable cargo: contact manager',
    ],
  },
  {
    from: 'Xi’an-Khorgos/Alashankou',
    to: 'Moscow',
    rates: { carton: 90, other: 100 },
    remarks: [
      'Battery cargo: UN38.3 certification required (power <100Wh)',
    ],
  },
  {
    from: 'Chongdu-Khorgos/Alashankou',
    to: 'Minsk',
    rates: { carton: 80, other: 80 }, // Тип упаковки не указан, ставка единая
    remarks: [],
  },
  {
    from: 'Saint Petersburg',
    to: 'Kaliningrad',
    rates: { carton: 145, other: 145 }, // Тип упаковки не указан
    remarks: [
      'Additional fees: 200USD/Bill + T1, 150USD/Bill (3 HS)',
    ],
  },
];

export function calculateShippingCost(
  from: string,
  to: string,
  packing: CargoType,
  volumeCBM: number,
  weightKG?: number
): { cost: number; remarks: string[] } | null {
  const route = routes.find(r => r.from === from && r.to === to);
  if (!route) return null;

  if (route.remarks.some(r => r.includes('Min 1CBM')) && volumeCBM < 1) {
    throw new Error('Minimum volume is 1CBM for this route.');
  }

  let adjustedVolume = volumeCBM;
  if (route.weightRule === '1CBM = 500KG' && weightKG) {
    adjustedVolume = Math.max(volumeCBM, weightKG / 500);
  }

  const rate = packing === 'Коробки/Палеты' ? route.rates.carton : route.rates.other;
  let cost = adjustedVolume * rate;

  // Добавление DTHC (если есть)
  if (route.dthc) {
    cost += route.dthc;
  }

  // Проверка особых условий (например, доплата за тяжелые грузы)
  const specialConditions: string[] = [];
  if (weightKG && weightKG > 3000) {
    specialConditions.push('Extra charges apply for weight >3000KG');
  }

  return {
    cost: parseFloat(cost.toFixed(2)),
    remarks: [...route.remarks, ...specialConditions],
  };
}
