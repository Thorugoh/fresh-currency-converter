import CurrencyConverterForm from "../islands/ConverterForm.tsx"

import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  amount: number;
  from: string;
  to: string;
  convertedAmount: number;
}

const DEFAULT_CURRENCY = 'USD';

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const amount = Number(url.searchParams.get('amount')) || 0;
    const from = url.searchParams.get('from') || DEFAULT_CURRENCY; 
    const to = url.searchParams.get('to') || DEFAULT_CURRENCY;
    const csResponse = await fetch(`https://api.currencyscoop.com/v1/convert?api_key=${Deno.env.get('API_KEY')}&from=${from}&to=${to}&amount=${amount}`)
    const res = await csResponse.json()
    
    return ctx.render({
      convertedAmount: res.response.value, amount, from, to
    })
  }
}

export default function Convert({ data }: PageProps<Data>){
  return(
    <main class="flex justify-center items-center h-screen">
      <div class="p-4 max-w-screen-md bg-white shadow-md rounded px-8 pt-6 pb-6">
        <CurrencyConverterForm 
          amount={data.amount}  
          from={data.from}
          to={data.to}
        />
        <div class="font-medium">
          <span class="text-slate-200">{data.amount} {data.from} =</span><br />
          <span class="text-2xl">{data.convertedAmount?.toFixed(2)} {data.to}</span><br />
        </div>
      </div>
    </main>
  )
}