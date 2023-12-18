import { Router } from 'express'
import util from 'util'
import mysql from 'mysql'

// Configura la conexión a MySQL
const config = {
  host: 'localhost',
  user: 'root',
  password: '1234567',
  port: 3306,
  database: 'consultorio_db',
}

const connection = mysql.createConnection(config)
const queryAsync = util.promisify(connection.query).bind(connection)

export const consultorioRouter = Router()

consultorioRouter.get('/usuarios', async (req, res) => {
  try {
    const results = await queryAsync('SELECT * FROM usuarios')
    res.json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al obtener usuarios' })
  }
})

consultorioRouter.get('/medicos', async (req, res) => {
  try {
    const results = await queryAsync('SELECT * FROM medicos')
    res.json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al obtener médicos' })
  }
})

consultorioRouter.post('/registrar-usuarios', async (req, res) => {
  const { nombre, apellido, email, telefono } = req.body

  try {
    await queryAsync(
      'INSERT INTO usuarios (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)',
      [nombre, apellido, email, telefono]
    )
    res.json({ mensaje: 'Paciente cargado correctamente' })
  } catch (error) {
    console.error(error)
  }
})

consultorioRouter.delete('/eliminar-usuarios', async (req, res) => {
  const id = req.query.id

  try {
    const result = await queryAsync(
      'DELETE FROM usuarios WHERE UsuarioID = ?',
      [id]
    )

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' })
    } else {
      res.json({ mensaje: 'Usuario eliminado correctamente' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar usuario' })
  }
})

consultorioRouter.delete('/eliminar-medicos', async (req, res) => {
  const id = req.query.id

  try {
    const result = await queryAsync('DELETE FROM medicos WHERE MedicoID = ?', [
      id,
    ])

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Medico no encontrado' })
    } else {
      res.json({ mensaje: 'Medico eliminado correctamente' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar Medico' })
  }
})

consultorioRouter.post('/registrar-medicos', async (req, res) => {
  const { nombre, apellido, especialidad, email, telefono } = req.body

  try {
    const result = await queryAsync(
      'INSERT INTO medicos (nombre, apellido, especialidad, email, telefono) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, especialidad, email, telefono]
    )

    const medicoID = result.insertId
    res.json({ mensaje: 'Datos insertados correctamente', medicoID })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al insertar datos' })
  }
})

consultorioRouter.get('/medicos/turnos-disponibles', async (req, res) => {
  try {
    const result = await queryAsync('SELECT * FROM turnosmedicos')
    res.json(result)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener turnos' })
  }
})

consultorioRouter.post('/medicos/turnos-disponibles', async (req, res) => {
  const { fecha, hora, id } = req.body

  try {
    await queryAsync(
      'INSERT INTO turnosmedicos (fecha, hora, medicoid) VALUES (?, ?, ?)',
      [fecha, hora, id]
    )
    res.json({ mensaje: 'Horarios insertados correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'error al insertar hora y fecha' })
  }
})

consultorioRouter.delete('/medicos/turnos-disponibles', async (req, res) => {
  const id = req.query.id

  try {
    const result = await queryAsync(
      'DELETE FROM turnosmedicos WHERE TurnoID = ?',
      [id]
    )

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'turno no encontrado' })
    } else {
      res.json({ mensaje: 'turno eliminado correctamente' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar usuario' })
  }
})
