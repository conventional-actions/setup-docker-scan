import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['RUNNER_TEMP'] = '/tmp'
  process.env['RUNNER_TOOL_CACHE'] = '/tmp'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'main', 'index.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  cp.execFileSync(np, [ip], options)
})
