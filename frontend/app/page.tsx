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

  const API_URL = "http://localhost:5000";

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/pedidos`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast.error("Erro ao carregar pedidos");
    }
  };

  const fetchIndicator = async () => {
    try {
      const response = await fetch(`${API_URL}/indicador`);
      const data = await response.json();
      setIndicator(data.media_pedidos_por_cliente);
    } catch (error) {
      toast.error("Erro ao carregar indicador");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchIndicator();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const method = editingOrder ? "PUT" : "POST";
      const url = editingOrder 
        ? `${API_URL}/pedidos/${editingOrder.id}`
        : `${API_URL}/pedidos`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente: formData.cliente,
          valor: parseFloat(formData.valor),
          descricao: formData.descricao,
        }),
      });

      if (response.ok) {
        toast.success(editingOrder ? "Pedido atualizado" : "Pedido criado");
        setIsOpen(false);
        setFormData({ cliente: "", valor: "", descricao: "" });
        setEditingOrder(null);
        fetchOrders();
        fetchIndicator();
      }
    } catch (error) {
      toast.error("Erro ao salvar pedido");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja realmente excluir este pedido?")) return;

    try {
      const response = await fetch(`${API_URL}/pedidos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Pedido excluído");
        fetchOrders();
        fetchIndicator();
      }
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

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <Package2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
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
            <div className="text-2xl font-bold">{indicator.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

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