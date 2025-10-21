'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';

interface MortgageRate {
  loanType: string;
  rate: number;
}

interface RatesData {
  rates: MortgageRate[];
  source: string;
  lastUpdated: string;
}

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('300000');
  const [downPayment, setDownPayment] = useState<string>('60000');
  const [interestRate, setInterestRate] = useState<string>('7.12');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [rates, setRates] = useState<MortgageRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/mortgage-rates');
      const data: RatesData = await response.json();
      setRates(data.rates);
    } catch (error) {
      console.error('Error fetching rates:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }

    // Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyPaymentCalc =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPaymentCalc = monthlyPaymentCalc * numberOfPayments;
    const totalInterestCalc = totalPaymentCalc - principal;

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalPayment(totalPaymentCalc);
    setTotalInterest(totalInterestCalc);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const selectRate = (rate: number) => {
    setInterestRate(rate.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Mortgage Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Calculate your monthly payments and explore current rates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Rates Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Current Rates
                </h2>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {rates.map((rate, index) => (
                    <button
                      key={index}
                      onClick={() => selectRate(rate.rate)}
                      className="w-full text-left p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:from-indigo-100 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200 border border-transparent hover:border-indigo-300 dark:hover:border-indigo-500"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {rate.loanType}
                        </span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {rate.rate}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                Click a rate to use it in your calculation
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Loan Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Loan Amount
                    </div>
                  </label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="300000"
                  />
                </div>

                {/* Down Payment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Down Payment
                    </div>
                  </label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="60000"
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center">
                      <Percent className="w-4 h-4 mr-1" />
                      Interest Rate (%)
                    </div>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="7.12"
                  />
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Loan Term (Years)
                    </div>
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                  >
                    <option value="10">10 Years</option>
                    <option value="15">15 Years</option>
                    <option value="20">20 Years</option>
                    <option value="30">30 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Monthly Payment */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center mb-2">
                  <Calculator className="w-5 h-5 mr-2" />
                  <h3 className="text-sm font-medium opacity-90">Monthly Payment</h3>
                </div>
                <p className="text-3xl font-bold">{formatCurrency(monthlyPayment)}</p>
              </div>

              {/* Total Payment */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <h3 className="text-sm font-medium opacity-90">Total Payment</h3>
                </div>
                <p className="text-3xl font-bold">{formatCurrency(totalPayment)}</p>
              </div>

              {/* Total Interest */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <h3 className="text-sm font-medium opacity-90">Total Interest</h3>
                </div>
                <p className="text-3xl font-bold">{formatCurrency(totalInterest)}</p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Loan Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Principal Amount</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(parseFloat(loanAmount) - parseFloat(downPayment))}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Down Payment</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(parseFloat(downPayment))}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Number of Payments</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {parseFloat(loanTerm) * 12} months
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Interest Rate</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {interestRate}% APR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
