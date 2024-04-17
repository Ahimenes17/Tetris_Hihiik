import {JSONFilePreset} from 'lowdb/node'

const scores = {players:[]}
const db = await JSONFilePreset('scores.json', scores)

await db.update(({persons }) => persons.push('Mike'))
