import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Card } from "@/components/ui/card";

export default function StockSelect({ label, value, onChange, exclude }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`/api/stocks/search?q=${query}`)
      .then(res => res.json())
      .then(setResults);
  }, [query]);

  return (
    <Card className="p-4">
      <p className="text-sm mb-2 font-medium">{label}</p>

      <Command>
        <CommandInput
          placeholder="Search stock..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {results
            .filter(stock => stock.symbol !== exclude)
            .map(stock => (
              <CommandItem
                key={stock.symbol}
                onSelect={() => {
                  onChange(stock.symbol);
                  setQuery(stock.symbol);
                }}
              >
                {stock.symbol} — {stock.name}
              </CommandItem>
            ))}
        </CommandList>
      </Command>

      {value && (
        <p className="text-xs mt-2 opacity-70">
          Selected: <strong>{value}</strong>
        </p>
      )}
    </Card>
  );
}
