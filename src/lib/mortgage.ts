/* ═══════════════════════════════════════════════════════════════
   Mortgage Calculation Engine
   Canadian market with BC-specific logic
   - Semi-annual compounding (Bank Act)
   - CMHC insurance tiers + 30yr surcharge
   - Minimum down payment rules
   - BC Property Transfer Tax (PTT)
   - Payment frequency conversions
   ═══════════════════════════════════════════════════════════════ */

// ── Types ──────────────────────────────────────────────────────

export type PaymentFrequency =
  | "monthly"
  | "semi-monthly"
  | "bi-weekly"
  | "accelerated-bi-weekly"
  | "weekly"
  | "accelerated-weekly";

export interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  annualRate: number;
  amortYears: number;
  frequency: PaymentFrequency;
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  strataMonthly: number;
  isFirstTimeBuyer: boolean;
  extraMonthlyPayment: number;
}

export interface MortgageResults {
  monthlyPI: number;
  frequencyPayment: number;
  totalMonthlyHousing: number;
  totalMortgageAmount: number;
  cmhcPremium: number;
  cmhcRequired: boolean;
  totalInterest: number;
  totalCostOfHome: number;
  payoffDate: string;
  bcPTT: number;
  bcPTTSavings: number;
  minimumDownPayment: number;
  belowMinimumDown: boolean;
  stressTestRate: number;
  stressTestPayment: number;
  propertyTaxMonthly: number;
  homeInsuranceMonthly: number;
}

export interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface YearlySummary {
  year: number;
  annualPayments: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
  cumulativeInterest: number;
}

// ── Step 1: Canadian semi-annual → monthly rate conversion ────

export function getMonthlyRate(annualRate: number): number {
  if (annualRate <= 0) return 0;
  const semiAnnualRate = annualRate / 2;
  return Math.pow(1 + semiAnnualRate, 1 / 6) - 1;
}

// ── Step 2: Monthly P&I payment ───────────────────────────────

export function calcMonthlyPayment(
  principal: number,
  annualRate: number,
  amortYears: number
): number {
  const r = getMonthlyRate(annualRate);
  const n = amortYears * 12;
  if (r === 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

// ── Step 3: CMHC insurance ────────────────────────────────────

export function calcCMHC(
  homePrice: number,
  downPayment: number,
  amortYears: number,
  isFirstTimeBuyer: boolean
): number {
  const mortgageAmount = homePrice - downPayment;
  const ltv = mortgageAmount / homePrice;

  if (ltv <= 0.8) return 0;
  if (homePrice > 1_500_000) return 0;

  let rate: number;
  if (ltv > 0.9) rate = 0.04;
  else if (ltv > 0.85) rate = 0.031;
  else rate = 0.028;

  // 30yr surcharge for eligible buyers
  if (amortYears > 25 && isFirstTimeBuyer) rate += 0.002;

  return mortgageAmount * rate;
}

// ── Step 4: Minimum down payment (Canada) ─────────────────────

export function calcMinimumDownPayment(homePrice: number): number {
  if (homePrice <= 500_000) {
    return homePrice * 0.05;
  } else if (homePrice < 1_500_000) {
    return 500_000 * 0.05 + (homePrice - 500_000) * 0.1;
  } else {
    return homePrice * 0.2;
  }
}

// ── Step 5: BC Property Transfer Tax ──────────────────────────

export function calcBCPTT(homePrice: number): number {
  let tax = 0;
  if (homePrice > 3_000_000) {
    tax += (homePrice - 3_000_000) * 0.05;
    tax += 1_000_000 * 0.03;
    tax += 1_800_000 * 0.02;
    tax += 200_000 * 0.01;
  } else if (homePrice > 2_000_000) {
    tax += (homePrice - 2_000_000) * 0.03;
    tax += 1_800_000 * 0.02;
    tax += 200_000 * 0.01;
  } else if (homePrice > 200_000) {
    tax += (homePrice - 200_000) * 0.02;
    tax += 200_000 * 0.01;
  } else {
    tax += homePrice * 0.01;
  }
  return tax;
}

export function calcBCPTTFirstTimeSavings(
  homePrice: number,
  isFirstTimeBuyer: boolean
): number {
  if (!isFirstTimeBuyer) return 0;
  const fullPTT = calcBCPTT(homePrice);
  if (homePrice <= 500_000) return fullPTT;
  if (homePrice <= 525_000) {
    // Partial exemption: proportional phase-out
    const ratio = (525_000 - homePrice) / 25_000;
    return fullPTT * ratio;
  }
  return 0;
}

// ── Step 6: Frequency conversion ──────────────────────────────

export function convertFrequency(
  monthlyPayment: number,
  frequency: PaymentFrequency
): number {
  switch (frequency) {
    case "monthly":
      return monthlyPayment;
    case "semi-monthly":
      return monthlyPayment / 2;
    case "bi-weekly":
      return (monthlyPayment * 12) / 26;
    case "accelerated-bi-weekly":
      return monthlyPayment / 2;
    case "weekly":
      return (monthlyPayment * 12) / 52;
    case "accelerated-weekly":
      return monthlyPayment / 4;
  }
}

export function getFrequencyLabel(frequency: PaymentFrequency): string {
  const labels: Record<PaymentFrequency, string> = {
    monthly: "Monthly",
    "semi-monthly": "Semi-Monthly",
    "bi-weekly": "Bi-Weekly",
    "accelerated-bi-weekly": "Accelerated Bi-Weekly",
    weekly: "Weekly",
    "accelerated-weekly": "Accelerated Weekly",
  };
  return labels[frequency];
}

// ── Step 7: Stress test ───────────────────────────────────────

export function calcStressTestRate(contractRate: number): number {
  return Math.max(contractRate + 0.02, 0.0525);
}

// ── Full calculation ──────────────────────────────────────────

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const {
    homePrice,
    downPayment,
    annualRate,
    amortYears,
    frequency,
    propertyTaxAnnual,
    homeInsuranceAnnual,
    strataMonthly,
    isFirstTimeBuyer,
  } = inputs;

  const cmhcPremium = calcCMHC(
    homePrice,
    downPayment,
    amortYears,
    isFirstTimeBuyer
  );
  const cmhcRequired = cmhcPremium > 0;

  // Principal = home price - down payment + CMHC (added to mortgage)
  const totalMortgageAmount = homePrice - downPayment + cmhcPremium;

  const monthlyPI = calcMonthlyPayment(
    totalMortgageAmount,
    annualRate,
    amortYears
  );

  const frequencyPayment = convertFrequency(monthlyPI, frequency);

  const propertyTaxMonthly = propertyTaxAnnual / 12;
  const homeInsuranceMonthly = homeInsuranceAnnual / 12;

  const totalMonthlyHousing =
    monthlyPI + propertyTaxMonthly + homeInsuranceMonthly + strataMonthly;

  const totalPayments = monthlyPI * amortYears * 12;
  const totalInterest = totalPayments - totalMortgageAmount;
  const totalCostOfHome = totalPayments + downPayment;

  const now = new Date();
  const payoffDate = new Date(
    now.getFullYear() + amortYears,
    now.getMonth()
  );
  const payoffDateStr = payoffDate.toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
  });

  const bcPTT = calcBCPTT(homePrice);
  const bcPTTSavings = calcBCPTTFirstTimeSavings(homePrice, isFirstTimeBuyer);

  const minimumDownPayment = calcMinimumDownPayment(homePrice);
  const belowMinimumDown = downPayment < minimumDownPayment;

  const stressTestRate = calcStressTestRate(annualRate);
  const stressTestPayment = calcMonthlyPayment(
    totalMortgageAmount,
    stressTestRate,
    amortYears
  );

  return {
    monthlyPI,
    frequencyPayment,
    totalMonthlyHousing,
    totalMortgageAmount,
    cmhcPremium,
    cmhcRequired,
    totalInterest,
    totalCostOfHome,
    payoffDate: payoffDateStr,
    bcPTT,
    bcPTTSavings,
    minimumDownPayment,
    belowMinimumDown,
    stressTestRate,
    stressTestPayment,
    propertyTaxMonthly,
    homeInsuranceMonthly,
  };
}

// ── Amortization schedule ─────────────────────────────────────

export function generateAmortization(
  principal: number,
  annualRate: number,
  amortYears: number
): AmortizationRow[] {
  const r = getMonthlyRate(annualRate);
  const n = amortYears * 12;
  const payment = calcMonthlyPayment(principal, annualRate, amortYears);
  let balance = principal;
  const schedule: AmortizationRow[] = [];

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      period: i,
      payment,
      principal: principalPaid,
      interest,
      balance,
    });
  }

  return schedule;
}

export function getYearlySummary(schedule: AmortizationRow[]): YearlySummary[] {
  const years: YearlySummary[] = [];
  let cumulativeInterest = 0;

  for (let y = 0; y < Math.ceil(schedule.length / 12); y++) {
    const start = y * 12;
    const end = Math.min(start + 12, schedule.length);
    const yearRows = schedule.slice(start, end);

    let annualPayments = 0;
    let principalPaid = 0;
    let interestPaid = 0;

    for (const row of yearRows) {
      annualPayments += row.payment;
      principalPaid += row.principal;
      interestPaid += row.interest;
    }

    cumulativeInterest += interestPaid;

    years.push({
      year: y + 1,
      annualPayments,
      principalPaid,
      interestPaid,
      remainingBalance: yearRows[yearRows.length - 1]?.balance ?? 0,
      cumulativeInterest,
    });
  }

  return years;
}

// ── Currency formatter ────────────────────────────────────────

export function formatCurrency(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
