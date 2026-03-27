import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {fileURLToPath} from 'url'
import {test, expect} from '@jest/globals'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

test('test runs and fails gracefully without token', () => {
  process.env['RUNNER_TEMP'] = '/tmp'
  process.env['RUNNER_TOOL_CACHE'] = '/tmp'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'main', 'index.cjs')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  expect(() => {
    cp.execFileSync(np, [ip], options)
  }).toThrow()
})
