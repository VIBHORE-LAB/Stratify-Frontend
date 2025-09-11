import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Trade } from "../types";

interface TradeTableProps{
    trades: Trade[];
}

export const TradeTable: React.FC<TradeTableProps> = ({ trades }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Side</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trades.map((trade) => (
          <TableRow key={trade.id}>
            <TableCell className="text-muted-foreground">{trade.timestamp}</TableCell>
            <TableCell>
              <Badge
                variant={trade.side === "BUY" ? "default" : "secondary"}
                className={trade.side === "BUY" ? "bg-trading-profit border-trading-profit/50" : "bg-trading-loss border-trading-loss/50"}
              >
                {trade.side}
              </Badge>
            </TableCell>
            <TableCell>{trade.qty}</TableCell>
            <TableCell>${trade.price}</TableCell>
            <TableCell className="font-medium">${trade.total.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
