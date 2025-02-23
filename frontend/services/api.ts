const API_URL = "http://localhost:5000";

export const api = {
  getPedidos: async () => {
    const response = await fetch(`${API_URL}/api/pedidos`);
    return response.json();
  },

  getIndicador: async () => {
    const response = await fetch(`${API_URL}/api/pedidos/indicador`);
    return response.json();
  },
  
  createPedido: async (pedido: { cliente: string; valor: number; descricao: string }) => {
    const response = await fetch(`${API_URL}/api/pedidos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
    return response.json();
  },

  updatePedido: async (id: string, pedido: { cliente: string; valor: number; descricao: string }) => {
    const response = await fetch(`${API_URL}/api/pedidos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
    return response.json();
  },

  deletePedido: async (id: string) => {
    const response = await fetch(`${API_URL}/api/pedidos/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  }
}; 