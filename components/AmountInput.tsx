interface AmountInputProps {
  value?: number;
  onChange: (newValue: number) => void;
}

export default function AmountInput({value, onChange}: AmountInputProps) {
  return(
    <div class="mb-4 px-1">
      <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
        Amount
      </label>
      <input 
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="amount" 
        id="amount"
        type="number"
        placeholder="0.0" 
        value={value || 0} required onChange={(e) => {
          onChange(e.target.value)
        }}
      />
    </div>
  )
}