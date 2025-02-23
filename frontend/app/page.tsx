"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package2, Users } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { DashboardCards } from "@/components/dashboard/DashboardCards";

interface Order {
  id: string;
  cliente: string;
  valor: number;
  data_criacao: string;
  descricao: string;
}

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [indicator, setIndicator] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    cliente: "",
    valor: "",
    descricao: "",
  });

  const fetchData = async () => {
    try {
      const [ordersData, indicatorData] = await Promise.all([
        api.getPedidos(),
        api.getIndicador()
      ]);
      
      setOrders(ordersData);
      setIndicator(indicatorData.media_pedidos_por_cliente);
    } catch (error) {
      toast.error("Erro ao carregar dados");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingOrder) {
        await api.updatePedido(editingOrder.id, {
          cliente: formData.cliente,
          valor: parseFloat(formData.valor),
          descricao: formData.descricao,
        });
        toast.success("Pedido atualizado");
      } else {
        await api.createPedido({
          cliente: formData.cliente,
          valor: parseFloat(formData.valor),
          descricao: formData.descricao,
        });
        toast.success("Pedido criado");
      }

      setIsOpen(false);
      setFormData({ cliente: "", valor: "", descricao: "" });
      setEditingOrder(null);
      fetchData();
    } catch (error) {
      toast.error("Erro ao salvar pedido");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja realmente excluir este pedido?")) return;

    try {
      await api.deletePedido(id);
      toast.success("Pedido excluído");
      fetchData();
    } catch (error) {
      toast.error("Erro ao excluir pedido");
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      cliente: order.cliente,
      valor: order.valor.toString(),
      descricao: order.descricao,
    });
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Sistema de Gestão de Pedidos</h1>

      <DashboardCards 
        totalPedidos={orders.length} 
        mediaPedidosPorCliente={indicator} 
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Pedidos</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingOrder(null);
                setFormData({ cliente: "", valor: "", descricao: "" });
              }}
            >
              Novo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingOrder ? "Editar Pedido" : "Novo Pedido"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Input
                  id="cliente"
                  value={formData.cliente}
                  onChange={(e) =>
                    setFormData({ ...formData, cliente: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, valor: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingOrder ? "Atualizar" : "Criar"} Pedido
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.cliente}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(order.valor)}
                  </TableCell>
                  <TableCell>
                    {new Date(order.data_criacao).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>{order.descricao}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(order)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(order.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}