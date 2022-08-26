import * as exec from '@actions/exec'
import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import os from 'os'

async function run(): Promise<void> {
  try {
    const scanVersion = core.getInput('scan-version') || 'latest'
    core.debug(`downloading ${scanVersion} version`)

    const toolPath = tc.find('docker-scan', scanVersion, os.arch())
    core.debug(`resolved tool to ${toolPath}`)

    await exec.exec(toolPath, ['--accept-license', '--login'])
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
