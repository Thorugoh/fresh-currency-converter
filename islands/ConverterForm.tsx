import supportedCurrencies from "../supported-currencies.json" assert {
  type: "json",
};
import AmountInput from "../components/AmountInput.tsx";
import CurrencySelect from "../components/CurrencySelect.tsx";
import { useEffect, useState } from "preact/hooks";

const currencyCodes = Object.entries(supportedCurrencies.fiats).map((
  [, currency],
) => currency.currency_code);

interface ConverterFormProps {
  amount?: number;
  from?: string;
  to?: string;
}

export default function ConverterForm(
  { amount, from, to }: ConverterFormProps,
) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    amount: amount,
    from,
    to,
  });

  return (
    <form action="/convert" onSubmit={() => setSubmitted(true)}>
      <div class="flex">
        <AmountInput 
          value={form.amount} 
          onChange={(amount) => setForm({ ...form, amount })} 
          />
        <CurrencySelect
          currencies={currencyCodes}
          defaultCurrency="USD"
          label="From"
          name="from"
          selectedCurrency={form.from}
          onChange={(from) => setForm({ ...form, from })}
        />
        <CurrencySelect
          currencies={currencyCodes}
          defaultCurrency="BRL"
          name="to"
          selectedCurrency={form.to}
          label="To"
          onChange={(to) => setForm({ ...form, to })}
        />
      </div>
      <div class="flex intems-center justify-center px-2">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={submitted}
        >
          {submitted ? "Converting..." : "Convert"}
        </button>
      </div>
      <div>
      </div>
    </form>
  );
}
