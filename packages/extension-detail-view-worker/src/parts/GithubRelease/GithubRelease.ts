import type { GithubReleaseAsset } from '../GithubReleaseAsset/GithubReleaseAsset.ts'

export interface GithubRelease {
  readonly assets: readonly GithubReleaseAsset[]
  readonly body: string
  readonly htmlUrl: string
  readonly name: string
  readonly publishedAt: string
  readonly tagName: string
}
