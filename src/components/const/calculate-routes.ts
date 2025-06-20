import type { CargoType } from "@/shared/types/cargo";

interface Route {
    from: string;
    to: string;
    rateCarton: number;
    minCBM?: number;
    weightRatio: number;
}

// DTHC не учитываем, т.к. нет доставки через порт
export const ROUTES: Route[] = [
    { from: "Hefei", to: "Moscow", rateCarton: 100, weightRatio: 500 },
    { from: "Suzhou", to: "Moscow", rateCarton: 100, minCBM: 1, weightRatio: 500 },
    { from: "Suzhou", to: "Saint Petersburg", rateCarton: 100, weightRatio: 500 },
    { from: "Chongqing-manzhouli", to: "Moscow", rateCarton: 85, weightRatio: 500 },
    { from: "Xi'an-Manzhouli", to: "Moscow", rateCarton: 90, weightRatio: 500 },
    { from: "Xi'an-Manzhouli", to: "Saint Petersburg", rateCarton: 85, weightRatio: 500 },
    { from: "Chongqing-Manzhouli", to: "Saint Petersburg", rateCarton: 80, weightRatio: 500 },
    { from: "Xian-Khorgos/Alashankou", to: "Moscow", rateCarton: 90, weightRatio: 500 },
];

export interface ShippingParams {
    from: string;
    to: string;
    cargoType: CargoType;
    count: number;
    weight: number;
    customsIncluded: boolean;
    insurance: boolean;
}

export function calculateShippingCost(params: ShippingParams) {
    // Обработка неподдерживаемых типов грузов
    if (params.cargoType !== 'Коробки/Палеты') {
        throw new Error("Расчет доступен только для типа 'коробки/паллеты'");
    }

    // Расчет объема в CBM (1 CBM = 500 кг)
    const volumeCBM = params.weight / 500;
    
    // Поиск подходящего маршрута
    const route = ROUTES.find(r => 
        params.from.startsWith(r.from.split('-')[0]) && 
        r.to === params.to
    );
    
    if (!route) {
        throw new Error("Маршрут не найден");
    }

    // Применение минимального объема
    const finalVolume = route.minCBM 
        ? Math.max(volumeCBM, route.minCBM) 
        : volumeCBM;

    // Расчет базовой стоимости
    let baseCost = finalVolume * route.rateCarton;
    
    // Добавление доплат
    if (params.customsIncluded) {
        baseCost += 50;
    }
    if (params.insurance) {
        baseCost += baseCost * 0.02;
    }

    return parseFloat(baseCost.toFixed(2));
}
