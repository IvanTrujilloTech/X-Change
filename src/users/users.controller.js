const userModel = require('./user.model');

// GET ALL
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error en getUsers:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET BY ID
const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(user);
  } catch (err) {
    console.error('Error en getUserById:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// POST
const createUser = async (req, res) => {
  try {
    const { email, password, id_rol } = req.body;
    const newUser = await userModel.createUser(email, password, id_rol);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error en createUser:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// PUT 
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, id_rol } = req.body;
    const updatedUser = await userModel.updateUser(id, email, password, id_rol);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error en updateUser:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userModel.deleteUser(id);
    res.json(result);
  } catch (err) {
    console.error('Error en deleteUser:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
