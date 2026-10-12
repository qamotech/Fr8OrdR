import { build } from 'vite'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

async function run() {
  await build()
  const distFile = resolve(import.meta.dirname, '../dist/dev.html')
  if (existsSync(distFile)) {
    const targets = [
      resolve(import.meta.dirname, '../index.html'),
      resolve(import.meta.dirname, '../Fr8OrdR.html'),
      resolve(import.meta.dirname, '../../../Fr8OrdR.html'),
    ]
    for (const target of targets) {
      try {
        copyFileSync(distFile, target)
        console.log(`Synced bundle -> ${target}`)
      } catch (err) {
        console.warn(`Could not sync to ${target}:`, err.message)
      }
    }
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
