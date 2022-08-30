import * as core from '@actions/core'
import os from 'os'
import * as io from '@actions/io'

type Config = {
  snyk_token: string
  version: string
  pluginDir: string
  pluginPath: string
}

export async function getConfig(): Promise<Config> {
  const snyk_token =
    core.getInput('token') ||
    process.env['SNYK_TOKEN'] ||
    process.env['SNYK_AUTH_TOKEN'] ||
    ''
  if (!snyk_token) {
    throw new Error(
      'token input or SNYK_TOKEN env or SNYK_AUTH_TOKEN env required'
    )
  }

  core.setSecret(snyk_token)

  const pluginDir = `${os.homedir()}/.docker/cli-plugins`
  core.debug(`plugin dir is ${pluginDir}`)
  await io.mkdirP(pluginDir)

  const pluginPath = `${pluginDir}/docker-scan`
  core.debug(`plugin path is ${pluginPath}`)

  return {
    snyk_token,
    version: core.getInput('version') || 'latest',
    pluginDir,
    pluginPath
  }
}
