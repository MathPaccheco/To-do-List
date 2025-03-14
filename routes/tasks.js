 const express = require("express");
 const Task = require("../models/Task");

const router = express.Router();

//rota para criar uma tarefa
router.post("/", async (req, res) => {
    const { tittle, description, status } = req.body; 
    try {
      const task = await Task.create({
        tittle,
        description,
        status: status || "pendente", 
      });
      res.json(task);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      res.status(500).json({ error: "Erro ao criar tarefa" });
    }
  });

//rota para listar todas as tarefas
router.get("/", async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

//Buscar uma tarefa por ID
router.get("/:id", async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: "Tarefa não encontrada" });
    }
});

//Atualizar uma tarefa
router.put("/:id", async (req, res) => {
    const { tittle, description, status } = req.body; // Corrigido: usando 'title' ao invés de 'tittle'
    
    try {
        const task = await Task.findByPk(req.params.id);
        
        if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });

        // Atualiza os dados da tarefa com os valores passados
        task.tittle = tittle;          // Atualiza o título
        task.description = description;  // Atualiza a descrição
        task.status = status;        // Atualiza o status
        
        // Salva as alterações no banco de dados
        await task.save();

        // Retorna a tarefa atualizada
        res.json(task);
    } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
        res.status(500).json({ error: "Erro ao atualizar a tarefa" });
    }
});

//Excluir uma tarefa
router.delete("/:id", async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if(task) {
        await task.destroy();
        res.json({ message : "Tarefa excluída" });
    } else {
        res.status(404).json({ error : "Tarefa não encontrada" });
    }
})

module.exports = router;