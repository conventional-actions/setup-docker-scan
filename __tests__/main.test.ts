import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {test, expect} from '@jest/globals'

test('test runs and fails gracefully without token', () => {
  process.env['RUNNER_TEMP'] = '/tmp'
  process.env['RUNNER_TOOL_CACHE'] = '/tmp'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'main', 'index.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  expect(() => {
    cp.execFileSync(np, [ip], options)
  }).toThrow()
})
