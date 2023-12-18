import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { corsMiddleware } from './middlewares/cors.js'
import { consultorioRouter } from './routes/pacientes.js'

const port = process.env.PORT ?? 3000
dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(corsMiddleware())

// app.get('/api/usuarios', async (req, res) => {
//   try {
//     const results = await queryAsync('SELECT * FROM usuarios')
//     res.json(results)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ mensaje: 'Error al obtener usuarios' })
//   }
// })

// app.get('/api/medicos', async (req, res) => {
//   try {
//     const results = await queryAsync('SELECT * FROM medicos')
//     res.json(results)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ mensaje: 'Error al obtener médicos' })
//   }
// })

// app.post('/api/registrar-usuarios', async (req, res) => {
//   const { nombre, apellido, email, telefono } = req.body

//   try {
//     await queryAsync(
//       'INSERT INTO usuarios (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)',
//       [nombre, apellido, email, telefono]
//     )
//     res.json({ mensaje: 'Paciente cargado correctamente' })
//   } catch (error) {
//     console.error(error)
//   }
// })

// app.delete('/api/eliminar-usuarios', async (req, res) => {
//   const id = req.query.id

//   try {
//     const result = await queryAsync(
//       'DELETE FROM usuarios WHERE UsuarioID = ?',
//       [id]
//     )

//     if (result.affectedRows === 0) {
//       res.status(404).json({ mensaje: 'Usuario no encontrado' })
//     } else {
//       res.json({ mensaje: 'Usuario eliminado correctamente' })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ mensaje: 'Error al eliminar usuario' })
//   }
// })

// app.delete('/api/eliminar-medicos', async (req, res) => {
//   const id = req.query.id

//   try {
//     const result = await queryAsync('DELETE FROM medicos WHERE MedicoID = ?', [
//       id,
//     ])

//     if (result.affectedRows === 0) {
//       res.status(404).json({ mensaje: 'Medico no encontrado' })
//     } else {
//       res.json({ mensaje: 'Medico eliminado correctamente' })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ mensaje: 'Error al eliminar Medico' })
//   }
// })

// app.post('/api/registrar-medicos', async (req, res) => {
//   const { nombre, apellido, especialidad, email, telefono } = req.body

//   try {
//     const result = await queryAsync(
//       'INSERT INTO medicos (nombre, apellido, especialidad, email, telefono) VALUES (?, ?, ?, ?, ?)',
//       [nombre, apellido, especialidad, email, telefono]
//     )

//     const medicoID = result.insertId
//     res.json({ mensaje: 'Datos insertados correctamente', medicoID })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ mensaje: 'Error al insertar datos' })
//   }
// })

// app.get('/api/medicos/turnos-disponibles', async (req, res) => {
//   try {
//     const result = await queryAsync('SELECT * FROM turnosmedicos')
//     res.json(result)
//   } catch (error) {
//     res.status(500).json({ mensaje: 'Error al obtener turnos' })
//   }
// })

// app.post('/api/medicos/turnos-disponibles', async (req, res) => {
//   const { fecha, hora, id } = req.body

//   try {
//     await queryAsync(
//       'INSERT INTO turnosmedicos (fecha, hora, medicoid) VALUES (?, ?, ?)',
//       [fecha, hora, id]
//     )
//     res.json({ mensaje: 'Horarios insertados correctamente' })
//   } catch (error) {
//     res.status(500).json({ mensaje: 'error al insertar hora y fecha' })
//   }
// })

// app.delete('/api/medicos/turnos-disponibles', async (req, res) => {
//   const id = req.query.id

//   try {
//     const result = await queryAsync(
//       'DELETE FROM turnosmedicos WHERE TurnoID = ?',
//       [id]
//     )

//     if (result.affectedRows === 0) {
//       res.status(404).json({ mensaje: 'turno no encontrado' })
//     } else {
//       res.json({ mensaje: 'turno eliminado correctamente' })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ mensaje: 'Error al eliminar usuario' })
//   }
// })

app.use('/api', consultorioRouter)

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
