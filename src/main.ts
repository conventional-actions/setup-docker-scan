import * as exec from '@actions/exec'
import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const token =
      core.getInput('token') ||
      process.env['SNYK_TOKEN'] ||
      process.env['SNYK_AUTH_TOKEN'] ||
      ''
    if (!token) {
      throw new Error(
        'token input or SNYK_TOKEN env or SNYK_AUTH_TOKEN env required'
      )
    }

    core.setSecret(token)
    core.info('Logging into snyk')
    await exec.exec('docker', [
      'scan',
      '--accept-license',
      '--login',
      '--token',
      token
    ])
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
