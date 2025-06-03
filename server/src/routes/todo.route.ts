import express from 'express';
import todoModel from 'src/models/todo.model';

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).json({message: 'Welcome to the Todofy API'});
});

router.get('/todos/get', async (req, res) => {
    try {
        const todos = await todoModel.find();
        const filteredTodos = todos.filter(todo => todo.userId === req.body.userId);
        res.status(200).json(filteredTodos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
});

router.post('/todos/add', async (req, res) => {
    try {
        const newTodo = new todoModel(req.body);
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
});

router.put('/todos/complete/', async (req, res) => {
    try {
        const { id } = req.body;
        const todo = await todoModel.findById(id);
        if (!todo) { res.status(404).json({ message: 'Todo not found' }); }
        else {
            todo.completed = !todo.completed;
            const updatedTodo = await todo.save();
            res.status(200).json(updatedTodo);
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Error updating todo', error });
    }
});

router.put('/todos/update', async (req, res) => {
    try {
        const { id, title } = req.body;
        const todo = await todoModel.findById(id);
        if (!todo) { res.status(404).json({ message: 'Todo not found' }); }
        else {
            todo.title = title;
            const updatedTodo = await todo.save();
            res.status(200).json(updatedTodo);
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Error updating todo', error });
    }
});

router.delete('/todos/delete/', async (req, res) => {
    try {
        const { id } = req.body;
        await todoModel.findByIdAndDelete(id);
        console.log(`Todo with id ${id} deleted successfully`);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Error deleting todo', error });
    }
});

export default router;