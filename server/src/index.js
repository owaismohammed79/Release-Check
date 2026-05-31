import express from "express"
import prisma from "./db.js"
import cors from "cors"

const app = express()
const TOTAL_STEPS = 7
const port = process.env.PORT || 4000 

app.use(cors())
app.use(express.json())

const calculateStatus = (completedSteps) => {
  const stepsArr = Array.isArray(completedSteps) ? completedSteps : []
  if (stepsArr.length === 0) return "planned"
  if (stepsArr.length === TOTAL_STEPS) return "done"
  return "ongoing"
}

app.get("/", (req, res) => {
  res.send("Hello")
})

app.get("/api/releases", async (req, res) => {
  try {
    const releasesData = await prisma.release.findMany({
      orderBy: {
        releaseDate: "asc",
      },
    })

    const releases = releasesData.map((release) => ({
      ...release,
      status: calculateStatus(release.completedSteps),
    }))

    res.json(releases)
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/api/releases", async (req, res) => {
  const { name, release_date, additional_info } = req.body
  try {
    const newRelease = await prisma.release.create({
      data: {
        name,
        releaseDate: new Date(release_date),
        additionalInfo: additional_info,
        completedSteps: [],
      },
    })

    const responseData = {
      ...newRelease,
      status: calculateStatus(newRelease.completedSteps),
    }

    res.status(201).json(responseData)
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

app.put("/api/releases/:id/steps", async (req, res) => {
  const { id } = req.params
  const { completed_steps } = req.body

  try {
    const updatedRelease = await prisma.release.update({
      where: { id: parseInt(id) },
      data: { completedSteps: completed_steps },
    })

    const responseData = {
      ...updatedRelease,
      status: calculateStatus(updatedRelease.completedSteps),
    }

    res.json(responseData)
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

app.put("/api/releases/:id/info", async (req, res) => {
  const { id } = req.params
  const { additional_info } = req.body

  try {
    const updatedRelease = await prisma.release.update({
      where: { id: parseInt(id) },
      data: { additionalInfo: additional_info },
    })

    const responseData = {
      ...updatedRelease,
      status: calculateStatus(updatedRelease.completedSteps),
    }

    res.json(responseData)
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

app.delete("/api/releases/:id", async (req, res) => {
  const { id } = req.params
  try {
    await prisma.release.delete({
      where: { id: parseInt(id) },
    })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

app.listen(port, () => {
  console.log(`Server running on port 3000`)
})
