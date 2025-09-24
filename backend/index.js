const { PrismaClient } = require("@prisma/client");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: `Todo with id ${id} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  if (!title && !description && completed === undefined) {
    return res.status(400).json({ error: "Please send data to be updated" });
  }

  try {
    const updateData = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description: description || null,
        completed: false
      }
    });
    res.status(201).json({ message: "Todo created successfully", todo: newTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/todos", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`📊 Database connected with Prisma ORM`);
});
