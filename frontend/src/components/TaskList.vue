<template>
  <div>
    <h2>Lista de Tarefas</h2>

    <!-- Tabela de Tarefas -->
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Descrição</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.tittle }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.status }}</td>
          <td>
            <button @click="editTask(task)">Editar</button>
            <button @click="deleteTask(task.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulário para Adicionar ou Editar Tarefa -->
    <div class="form-container">
      <h3>{{ editingTask ? "Editar Tarefa" : "Nova Tarefa" }}</h3>
      <input v-model="taskTittle" placeholder="Título da Tarefa" />
      <textarea v-model="taskDescription" placeholder="Descrição"></textarea>

      <!-- Seleção do Status -->
      <select v-model="taskStatus">
        <option value="pendente">Pendente</option>
        <option value="em andamento">Em andamento</option>
        <option value="concluído">Concluído</option>
      </select>

      <button @click="saveTask">
        {{ editingTask ? "Atualizar" : "Adicionar" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const tasks = ref([]);
const taskTittle = ref("");
const taskDescription = ref("");
const taskStatus = ref("pendente"); // Valor padrão do status
const editingTask = ref(null);

const fetchTasks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/tasks");
    tasks.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
};

const saveTask = async () => {
  if (!taskTittle.value || !taskDescription.value) return;

  if (editingTask.value) {
    // Atualiza tarefa existente
    await axios.put(`http://localhost:3000/tasks/${editingTask.value.id}`, {
      tittle: taskTittle.value,
      description: taskDescription.value,
      status: taskStatus.value,
    });
    editingTask.value = null;
  } else {
    // Cria uma nova tarefa
    await axios.post("http://localhost:3000/tasks", {
      tittle: taskTittle.value,
      description: taskDescription.value,
      status: taskStatus.value,
    });
  }

  taskTittle.value = "";
  taskDescription.value = "";
  taskStatus.value = "pendente"; // Resetar para o valor padrão
  fetchTasks();
};

const editTask = (task) => {
  taskTittle.value = task.tittle;
  taskDescription.value = task.description;
  taskStatus.value = task.status;
  editingTask.value = task;
};

const deleteTask = async (id) => {
  await axios.delete(`http://localhost:3000/tasks/${id}`);
  fetchTasks();
};

onMounted(fetchTasks);
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color:rgb(12, 3, 3);
}
button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
textarea {
  resize: none;
  height: 80px;
}
select {
  padding: 8px;
}
</style>
