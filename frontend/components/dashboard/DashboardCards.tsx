"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, Users } from "lucide-react";

interface DashboardCardsProps {
  totalPedidos: number;
  mediaPedidosPorCliente: number;
}

export function DashboardCards({ totalPedidos, mediaPedidosPorCliente }: DashboardCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
          <Package2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPedidos}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Média de Pedidos por Cliente
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mediaPedidosPorCliente.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
} 