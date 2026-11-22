import { describe, expect, it } from "vitest";
import {
  plans,
  processPlans,
  avulsoPlan,
  planDiscountPercent,
  planMonthlySaving,
  planTotal,
  REFERENCE_MONTHLY_PRICE,
} from "./plans";
import { formatBRL, formatPercent } from "@/lib/format";

const byId = (id: string) => {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`plano ${id} ausente`);
  return plan;
};

describe("planos — valores informados pela empresa", () => {
  it("mantém a referência avulsa de R$ 630/mês", () => {
    expect(REFERENCE_MONTHLY_PRICE).toBe(630);
    expect(avulsoPlan.monthlyPrice).toBe(630);
  });

  it("descontos calculados batem com os percentuais informados", () => {
    expect(formatPercent(planDiscountPercent(byId("fundamentos")))).toBe("4,76%");
    expect(formatPercent(planDiscountPercent(byId("equilibrio")))).toBe("10,32%");
    expect(formatPercent(planDiscountPercent(byId("excelencia")))).toBe("15,87%");
  });

  it("economia mensal em reais em relação ao avulso", () => {
    expect(planMonthlySaving(byId("fundamentos"))).toBe(30);
    expect(planMonthlySaving(byId("equilibrio"))).toBe(65);
    expect(planMonthlySaving(byId("excelencia"))).toBe(100);
  });

  it("totais de referência batem com os valores informados", () => {
    expect(planTotal(byId("fundamentos"))).toBe(1800);
    expect(planTotal(byId("equilibrio"))).toBe(2825);
    expect(planTotal(byId("excelencia"))).toBe(3180);
    expect(planTotal(avulsoPlan)).toBeNull();
  });

  it("os planos de processo excluem o Avulso e só o Equilíbrio é destaque", () => {
    expect(processPlans.map((p) => p.id)).toEqual(["fundamentos", "equilibrio", "excelencia"]);
    expect(plans.filter((p) => p.featured).map((p) => p.id)).toEqual(["equilibrio"]);
  });

  it("o Excelência tem a menor mensalidade", () => {
    const lowest = [...plans].sort((a, b) => a.monthlyPrice - b.monthlyPrice)[0];
    expect(lowest?.id).toBe("excelencia");
  });
});

describe("formatação", () => {
  it("formata reais sem centavos", () => {
    expect(formatBRL(1800)).toBe("R$ 1.800");
    expect(formatBRL(530)).toBe("R$ 530");
  });
});
