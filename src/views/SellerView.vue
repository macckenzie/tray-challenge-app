<script setup lang="ts">
import {onMounted, ref} from 'vue'
import http from "./../service/http.js";
import dayjs from 'dayjs';
import Modal from "@/components/modal/Modal.vue";

interface Sale {
  id: number
  amount: string
  date: string
}

interface Seller {
  id: number
  name: string
  email: string
  commission_rate: number
  sales: Sale[]
}

const sellers = ref<Seller[]>([]);
const expandedSellerId = ref<number | null>(null);
const deleteModal = ref({
  show: false,
  seller: null
});
const editModal = ref({
  show: false,
  seller: null
});

function toggleSales(seller: Seller) {
  if (expandedSellerId.value !== seller.id || seller.sales.length === 0) {
    getSellerSales(seller);
  }

  if (expandedSellerId.value === seller.id) {
    expandedSellerId.value = null
  } else {
    expandedSellerId.value = seller.id
  }
}

async function updateSeller() {
  let seller = editModal.value.seller;

  await http.put(`sellers/${seller.id}`, {
    commission_rate: seller.commission_rate
  }).then(() => {
    alert('ALTERADO - por um toast');
    listSellers();
    editModal.value.show = false;
    editModal.value.seller = null;
  })
}

async function deleteSeller() {
  await http.delete(`sellers/${deleteModal.value.seller.id}`)
      .then(() => {
        alert('REMOVIDO - por um toast');
        listSellers();
        deleteModal.value.show = false;
        deleteModal.value.seller = null;
      })
}

function formatDate(dateStr: string): string {
  return dayjs(dateStr).format('DD/MM/YYYY')
}

async function listSellers() {
  try {
    const response = await http.get('sellers')
    sellers.value = response.data.map((seller: any) => ({
      id: seller.seller_id,
      name: seller.user_name,
      email: seller.user_email,
      commission_rate: seller.commission_rate,
      sales: seller.sales ?? []
    }))
  } catch (error) {
    console.error('Erro ao buscar vendedores:', error);
  }
}

async function getSellerSales(seller: Seller) {
  try {
    const response = await http.get(`sellers/${seller.id}/sales`)
    seller.sales = response.data.map((item: any) => ({
      id: item.sale_id,
      amount: item.amount,
      date: item.sold_at
    }));
  } catch (error) {
    console.error(`Erro ao buscar vendas do vendedor ${seller.id}:`, error);
    seller.sales = [];
  }
}

onMounted(async () => {
  await listSellers();
})
</script>

<template>
  <section class="seller-view">
    <h1>Vendedores</h1>

    <table>
      <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Comissão</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="seller in sellers" :key="seller.id">
        <tr>
          <td>{{ seller.name }}</td>
          <td>{{ seller.email }}</td>
          <td>{{ seller.commission_rate }}%</td>
          <td class="actions">
            <button @click="toggleSales(seller)">
              <font-awesome-icon :icon="expandedSellerId === seller.id ? 'eye-slash' : 'eye'" style="color: white"/>
            </button>
            <button @click="editModal.show = true; editModal.seller = seller" title="Alterar vendedor">
              <font-awesome-icon icon="fa-pen"/>
            </button>
            <button @click="deleteModal.show = true; deleteModal.seller = seller" title="Apagar vendedor">
              <font-awesome-icon icon="fa-trash" style="color: red"/>
            </button>
          </td>
        </tr>
        <tr v-if="expandedSellerId === seller.id" class="sales-row">
          <td colspan="4">
            <strong>Vendas ({{ seller.sales.length }}):</strong>
            <table class="sales-table">
              <thead>
              <tr>
                <th>ID da Venda</th>
                <th>Valor (R$)</th>
                <th>Data</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="sale in seller.sales" :key="sale.id">
                <td>{{ sale.id }}</td>
                <td>{{ sale.amount }}</td>
                <td>{{ formatDate(sale.date) }}</td>
              </tr>
              <tr v-if="seller.sales.length === 0">
                <td colspan="3" style="text-align: center;">Nenhuma venda encontrada para este vendedor.</td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </template>
      <tr v-if="sellers.length === 0">
        <td colspan="4" style="text-align: center; padding: 20px;">Nenhum vendedor encontrado.</td>
      </tr>
      </tbody>
    </table>
  </section>

  <Modal :show="deleteModal.show" title="Apagar Vendedor" @close="deleteModal.show = false">
    <template #content>
      <p class="text-center">Apagar vendedor {{ deleteModal.seller.name }}?</p>
    </template>
    <template #footer>
      <button type="button" class="btn btn-sm btn-danger" @click="deleteModal.show = false">Fechar</button>
      <button type="button" class="btn btn-sm btn-primary" @click="deleteSeller">Confirmar</button>
    </template>
  </Modal>

  <Modal :show="editModal.show" title="Alterar Vendedor" @close="editModal.show = false">
    <template #content>
      <form @submit.prevent="updateSeller">
        <div class="form-group">
          <label class="form-label" for="commission_rate">Taxa de Comissão (%):</label><br>
          <input type="number" class="form-control" id="commission_rate"
                 v-model.number="editModal.seller.commission_rate"
                 step="0.01" min="0" max="100" required/>
        </div>
      </form>
    </template>
    <template #footer>
      <button type="button" class="btn btn-sm btn-danger" @click="editModal.show = false">Fechar</button>
      <button type="button" class="btn btn-sm btn-primary" @click="updateSeller">Atualizar</button>
    </template>
  </Modal>

</template>

<style scoped>
.seller-view {
  padding: 2rem 0;
}

.seller-view h1 {
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  color: var(--color-text);
}

table {
  border-collapse: collapse;
  width: 95%;
  margin: 0 auto;
}

th, td {
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  text-align: left;
}

th {
  background-color: #222;
  font-weight: 600;
  color: var(--color-text);
}

td {
  background-color: #1a1a1a;
  color: var(--color-text);
}

.actions button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
  background-color: #333;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  border-radius: 3px;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.actions button:hover {
  background-color: #4fc08d;
  color: #121212;
}

.sales-row td {
  background-color: #2a2a2a;
  padding: 0.5rem 1rem;
}

.sales-table th,
.sales-table td {
  border: 1px solid #3a3a3a;
  padding: 0.5rem 0.8rem;
  background-color: #2a2a2a;
}

.sales-table th {
  background-color: #333;
}

.sales-row strong {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1em;
}
</style>