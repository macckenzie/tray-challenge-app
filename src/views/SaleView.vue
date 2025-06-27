<script setup lang="ts">
import {onMounted, ref} from 'vue'
import http from "./../service/http.js";
import dayjs from 'dayjs';
import Modal from "@/components/modal/Modal.vue";

interface Sale {
  id: number
  amount: string
  datetime: string
  seller: Seller
}

interface Seller {
  id: number
  name: string
  email: string
  commission_rate: number
}

const sales = ref<Sale[]>([]);
const deleteModal = ref({
  show: false,
  sale: null
});
const editModal = ref({
  show: false,
  sale: null
});

async function updateSale() {
  let sale = editModal.value.sale;

  await http.put(`sales/${sale.id}`, {
    amount: sale.amount,
  }).then(() => {
    alert('ALTERADO - por um toast');
    listSales();
    editModal.value.show = false;
    editModal.value.sale = null;
  })
}

async function deleteSale() {
  await http.delete(`sales/${deleteModal.value.sale.id}`)
      .then(() => {
        alert('REMOVIDO - por um toast');
        listSales();
        deleteModal.value.show = false;
        deleteModal.value.sale = null;
      })
}

function formatDate(dateStr: string, format = 'DD/MM/YYYY hh:mm:ss'): string {
  return dayjs(dateStr).format(format)
}

async function listSales() {
  try {
    const response = await http.get('sales')
    sales.value = response.data.map((sale: any) => ({
      id: sale.sale_id,
      amount: sale.amount,
      datetime: sale.sold_at,
      seller: {
        id: sale.seller.seller_id,
        name: sale.seller.user.user_name,
        email: sale.seller.user.user_email,
        commission_rate: sale.seller.commission_rate,
      }
    }))
  } catch (error) {
    console.error('Erro ao buscar as vendas:', error);
  }
}

onMounted(async () => {
  await listSales();
})
</script>

<template>
  <section class="seller-view">
    <h1>Todas as Vendas</h1>

    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Vendido em</th>
        <th>Vendido por</th>
        <th>Valor</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="sale in sales" :key="sale.id">
        <tr>
          <td>{{ sale.id }}</td>
          <td>{{ formatDate(sale.date) }}</td>
          <td>{{ sale.seller.name }}</td>
          <td>R${{ sale.amount }}</td>
          <td class="actions">
            <button @click="editModal.show = true; editModal.sale = sale" title="Alterar venda">
              <font-awesome-icon icon="fa-pen"/>
            </button>
            <button @click="deleteModal.show = true; deleteModal.sale = sale" title="Apagar venda">
              <font-awesome-icon icon="fa-trash" style="color: red"/>
            </button>
          </td>
        </tr>
      </template>
      <tr v-if="sales.length === 0">
        <td colspan="4" style="text-align: center; padding: 20px;">Nenhuma venda encontrada.</td>
      </tr>
      </tbody>
    </table>
  </section>

  <Modal :show="deleteModal.show" title="Apagar Venda" @close="deleteModal.show = false">
    <template #content>
      <div class="text-center">
        <p class="text-center">Apagar venda {{ deleteModal.sale.id }} de R${{ deleteModal.sale.amount }}?</p>
        <small class="text-muted"><b>Vendedor: {{ deleteModal.sale.seller.name }}</b></small>
      </div>
    </template>
    <template #footer>
      <button type="button" class="btn btn-sm btn-danger" @click="deleteModal.show = false">Fechar</button>
      <button type="button" class="btn btn-sm btn-primary" @click="deleteSale">Confirmar</button>
    </template>
  </Modal>

  <Modal :show="editModal.show" title="Alterar Venda" @close="editModal.show = false">
    <template #content>
      <form>
        <small class="text-muted">Venda {{ editModal.sale.id }}</small><br>
        <small class="text-muted">Vendedor: {{ editModal.sale.seller.name }}</small>
        <br><br>
        <div class="form-group">
          <label for="amount">Valor (R$):</label>
          <input class="form-control" type="number" id="amount" v-model.number="editModal.sale.amount" step="0.01"
                 min="0" required/>
        </div>
      </form>
      <br>
    </template>
    <template #footer>
      <button type="button" class="btn btn-sm btn-danger" @click="editModal.show = false">Fechar</button>
      <button type="button" class="btn btn-sm btn-primary" @click="updateSale">Atualizar</button>
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