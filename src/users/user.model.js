const db = require("../db/connection");

// GET ALL
async function getAllUsers() {
  try {
    const result = await db.query("SELECT * FROM usuarios");
    return result.rows;
  } catch (err) {
    if (err.code === "ECONNREFUSED" || err.code === "ETIMEDOUT") {
      throw new Error("Error de conexión con la base de datos");
    }
    throw new Error("Error al obtener usuarios: " + err.message);
  }
}

// GET BY ID
async function getUserById(id) {
  try {
    if (!id || isNaN(id)) {
      throw new Error("ID de usuario inválido");
    }

    // $1 en lugar de ?
    const result = await db.query(
      "SELECT * FROM usuarios WHERE id_usuario = $1",
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return result.rows[0];
  } catch (err) {
    throw new Error("Error al obtener usuario: " + err.message);
  }
}

// POST - id_usuario es auto-generado)
async function createUser(email, password, id_rol) {
  try {
    if (!email || !password || !id_rol) {
      throw new Error("Email, password e id_rol son requeridos");
    }

    if (isNaN(id_rol)) {
      throw new Error("id_rol debe ser un número válido");
    }

    const result = await db.query(
      `INSERT INTO usuarios (email, password, id_rol)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [email, password, id_rol]
    );
    return result.rows[0];
  } catch (err) {
    // Errores específicos de PostgreSQL
    if (err.code === "23505") {
      // Violación de UK
      throw new Error("El email ya está registrado");
    }
    if (err.code === "23503") {
      // Violación de FK
      throw new Error("El rol especificado no existe");
    }
    if (err.code === "23502") {
      // Violación de NN
      throw new Error("Campos requeridos faltantes");
    }
    throw new Error("Error al crear usuario: " + err.message);
  }
}

// PUT
async function updateUser(id, email, password, id_rol) {
  try {
    if (!id || isNaN(id)) {
      throw new Error("ID de usuario inválido");
    }

    const result = await db.query(
      `UPDATE usuarios
       SET email = $1, password = $2, id_rol = $3
       WHERE id_usuario = $4
       RETURNING *`,
      [email, password, id_rol, id]
    );

    if (result.rows.length === 0) {
      throw new Error("No se pudo actualizar el usuario");
    }

    return result.rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new Error("El email ya está en uso por otro usuario");
    }
    throw new Error("Error al actualizar usuario: " + err.message);
  }
}

// DELETE
async function deleteUser(id) {
  try {
    if (!id || isNaN(id)) {
      throw new Error("ID de usuario inválido");
    }

    const result = await db.query(
      "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error("No se pudo eliminar el usuario");
    }

    return result.rows[0];
  } catch (err) {
    if (err.code === "23503") {
      // Foreign key violation
      throw new Error(
        "No se puede eliminar el usuario porque tiene registros relacionados"
      );
    }
    throw new Error("Error al eliminar usuario: " + err.message);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
