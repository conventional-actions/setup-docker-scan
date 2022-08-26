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

    const token =
      core.getInput('token') ||
      process.env['SNYK_TOKEN'] ||
      process.env['SNYK_AUTH_TOKEN'] ||
      ''
    if (token) {
      core.setSecret(token)

      core.info('logging into snyk')
      await exec.exec(toolPath, [
        '--accept-license',
        '--login',
        '--token',
        token
      ])
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
