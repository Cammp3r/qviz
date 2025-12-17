import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Data files
const QUIZZES_FILE = path.join(__dirname, 'data', 'quizzes.json')
const RESULTS_FILE = path.join(__dirname, 'data', 'results.json')

// Ensure data directory exists
await fs.mkdir(path.join(__dirname, 'data'), { recursive: true })

// Helper to read JSON file
async function readJSON(file) {
  try {
    const data = await fs.readFile(file, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    if (err.code === 'ENOENT') return []
    throw err
  }
}

// Helper to write JSON file
async function writeJSON(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8')
}

// Routes for quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await readJSON(QUIZZES_FILE)
    res.json(quizzes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await readJSON(QUIZZES_FILE)
    const newQuiz = req.body
    quizzes.push(newQuiz)
    await writeJSON(QUIZZES_FILE, quizzes)
    res.json(newQuiz)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/quizzes/:id', async (req, res) => {
  try {
    const quizzes = await readJSON(QUIZZES_FILE)
    const filtered = quizzes.filter(q => q.id !== req.params.id)
    await writeJSON(QUIZZES_FILE, filtered)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Routes for results
app.get('/api/results', async (req, res) => {
  try {
    const results = await readJSON(RESULTS_FILE)
    res.json(results)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/results', async (req, res) => {
  try {
    const results = await readJSON(RESULTS_FILE)
    const newResult = req.body
    results.push(newResult)
    await writeJSON(RESULTS_FILE, results)
    res.json(newResult)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`QViz backend running on http://localhost:${PORT}`)
})
