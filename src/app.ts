import express, { Request, Response } from 'express'
import cors from 'cors'
import loudness from 'loudness'
import { getLocalIpAddress } from './lib/ip'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/volume', async (req: Request, res: Response) => {
  try {
    const volume = await loudness.getVolume()
    res.json({ volume })
  } catch (error) {
    res.status(500).json({ error: `Failed to get volume, ${error}` })
  }
})

app.post('/volume', async (req: Request, res: Response) => {
  try {
    const { volume } = req.body
    if (typeof volume !== 'number' || volume < 0 || volume > 100) {
      return res.status(400).json({ error: 'Volume must be between 0 and 100' })
    }

    await loudness.setVolume(volume)
    res.json({ success: true, volume })
  } catch (error) {
    res.status(500).json({ error: `Failed to set volume, ${error}` })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Your computer ip is: ${getLocalIpAddress()}`)
})
