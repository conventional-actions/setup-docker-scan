import * as exec from '@actions/exec'
import * as core from '@actions/core'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    core.info('Logging into snyk')
    await exec.exec('docker', [
      'scan',
      '--accept-license',
      '--login',
      '--snyk_token',
      config.snyk_token
    ])
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
