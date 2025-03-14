<script setup>
import TaskList from "./components/TaskList.vue";
</script>

<template>
  <div class="container">
    <h1>Gerenciador de Tarefas</h1>
    <TaskList />
  </div>
</template>

<style>
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
}
</style>
