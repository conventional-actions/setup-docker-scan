import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as tc from '@actions/tool-cache'
import os from 'os'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    const manifest = await tc.getManifestFromRepo(
      'conventional-actions',
      'docker-scan',
      process.env['GITHUB_TOKEN'] || '',
      'main'
    )
    core.debug(`manifest = ${JSON.stringify(manifest)}`)

    const rel = await tc.findFromManifest(
      config.version === 'latest' ? '*' : config.version,
      true,
      manifest,
      os.arch()
    )
    core.debug(`rel = ${JSON.stringify(rel)}`)

    if (rel && rel.files.length > 0) {
      const downloadUrl = rel.files[0].download_url
      core.debug(`downloading from ${downloadUrl}`)

      const downloadPath = await tc.downloadTool(downloadUrl)
      core.debug(`downloaded to ${downloadPath}`)

      await exec.exec('chmod', ['+x', downloadPath])

      core.debug(`copying ${downloadPath} to ${config.pluginPath}`)
      await io.cp(downloadPath, config.pluginPath)

      core.debug('caching tool')
      const toolPath = await tc.cacheFile(
        downloadPath,
        'docker-scan',
        'docker-scan',
        rel.version,
        os.arch()
      )
      core.debug(`tool path ${toolPath}`)
    } else {
      throw new Error(
        `could not find docker-scan ${config.version} for ${os.arch()}`
      )
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
