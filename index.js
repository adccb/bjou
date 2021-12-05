import { homedir } from 'os'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'

import prompts from 'prompts'

import { getWeekHead } from './date-util.js'

const configDir = `${homedir()}/.config/bjou`
const storageFilename = 'bjou.json'
const storagePath = [configDir, storageFilename].join('/')

// make the config dir and the main json storage if needed
if (!existsSync(configDir)) mkdirSync(configDir, { recursive: true })
if (!existsSync(storagePath))
  writeFileSync(
    storagePath,
    '{"questions":["what are my 3 priorities for this week?", "what are my win conditions for this week?"],"entries": {}}',
  )

// application logic time! let's read the journal and
// find or create the heading for this week
const journal = JSON.parse(readFileSync(storagePath, 'utf-8'))
const weekHead = getWeekHead().toISOString().split('T')[0]

if (!journal.entries[weekHead]) {
  journal.entries[weekHead] = {
    questions: [],
    dailies: {},
  }
}

prompts(
  journal.questions.map((question, index) => ({
    type: 'text',
    name: index,
    message: question,
  })),
)
  .then(questions => {
    journal.entries[weekHead].questions = Object.values(questions)
  })
  .then(() => {
    prompts({
      type: 'confirm',
      name: 'write',
      message: 'write this to your journal?',
      initial: true,
    }).then(({ write }) => {
      if (write) writeFileSync(storagePath, JSON.stringify(journal))
    })
  })
