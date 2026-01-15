import { Card } from "@/components/ui/card";

const metrics = [
  { key: "price", label: "Current Price", format: v => `Rs. ${v}` },
  { key: "changePercent", label: "Change %", format: v => `${v}%` },
  { key: "high52w", label: "52W High", format: v => v },
  { key: "low52w", label: "52W Low", format: v => v },
  { key: "marketCap", label: "Market Cap", format: v => `${v}M` },
  { key: "peRatio", label: "P/E Ratio", format: v => v },
  { key: "volume", label: "Volume", format: v => v },
];

export default function CompareTable({ stocks }) {
  const [a, b] = stocks;

  const better = (x, y) =>
    x > y ? "text-green-600" : x < y ? "text-red-600" : "";

  return (
    <Card className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="text-left p-3">Metric</th>
            <th className="p-3">{a.symbol}</th>
            <th className="p-3">{b.symbol}</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map(m => (
            <tr key={m.key} className="border-b last:border-0">
              <td className="p-3 font-medium">{m.label}</td>
              <td className={`p-3 ${better(a[m.key], b[m.key])}`}>
                {m.format(a[m.key])}
              </td>
              <td className={`p-3 ${better(b[m.key], a[m.key])}`}>
                {m.format(b[m.key])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
