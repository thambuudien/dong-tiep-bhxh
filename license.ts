import type { FetchError } from 'ofetch'
import { ofetch } from 'ofetch'
import { readPackageJSON, findNearestFile } from 'pkg-types'

export async function validateLicense(opts: { key: string, dir: string, theme: { env: string, link: string } }) {

}

function _createError(message: string) {
    const error = new Error(message)
    try {
        error.stack = ''
    } catch { /* runtime not supports */ }
    return error
}

// --- Utilities to get git info ---

interface GitInfo {
    // Repository name
    name: string
    // Repository owner/organization
    owner: string
    // Repository URL
    url: string
}

async function _getLocalGitInfo(rootDir: string): Promise<GitInfo | undefined> {
    const remote = await _getLocalGitRemote(rootDir)
    if (!remote) {
        return
    }

    // https://www.npmjs.com/package/git-url-parse#clipboard-example
    const gitUrlParse = await import('git-url-parse' as string).then(r => r.default || r) as (input: string) => Record<string, string>
    const { name, owner, source } = gitUrlParse(remote)
    const url = `https://${source}/${owner}/${name}`

    return {
        name: name || '',
        owner: owner || '',
        url
    }
}

async function _getLocalGitRemote(dir: string) {
    try {
        // https://www.npmjs.com/package/parse-git-config#options
        const parseGitConfig = await import('parse-git-config' as string).then(
            m => m.promise
        ) as (opts: { path: string }) => Promise<Record<string, Record<string, string>>>
        const gitDir = await findNearestFile('.git/config', { startingFrom: dir })
        const parsed = await parseGitConfig({ path: gitDir })
        if (!parsed) {
            return
        }
        const gitRemote = parsed['remote "origin"']?.url
        return gitRemote
    } catch {
        return
    }
}

function _getGitEnv(): GitInfo | undefined {
    // https://github.com/unjs/std-env/issues/59
    const envInfo = {
        // Provider
        provider: process.env.VERCEL_GIT_PROVIDER // vercel
            || (process.env.GITHUB_SERVER_URL ? 'github' : undefined), // github
        // Owner
        owner: process.env.VERCEL_GIT_REPO_OWNER // vercel
            || process.env.GITHUB_REPOSITORY_OWNER // github
            || process.env.CI_PROJECT_PATH?.split('/').shift(), // gitlab
        // Name
        name: process.env.VERCEL_GIT_REPO_SLUG
            || process.env.GITHUB_REPOSITORY?.split('/').pop() // github
            || process.env.CI_PROJECT_PATH?.split('/').splice(1).join('/'), // gitlab
        // Url
        url: process.env.REPOSITORY_URL // netlify
    }

    if (!envInfo.url && envInfo.provider && envInfo.owner && envInfo.name) {
        envInfo.url = `https://${envInfo.provider}.com/${envInfo.owner}/${envInfo.name}`
    }

    if (!envInfo.name || !envInfo.owner || !envInfo.url) {
        return
    }

    return {
        name: envInfo.name,
        owner: envInfo.owner,
        url: envInfo.url
    }
}

async function _getPkgName(dir: string) {
    if (process.env.npm_package_name) {
        return process.env.npm_package_name
    }

    const projectPkg = await readPackageJSON(dir).catch(() => null)
    if (projectPkg?.name) {
        return projectPkg.name
    }

    throw new Error('You must provide a `name` in your `package.json` to activate Nuxt UI Pro.')
}
