const githubIssueLinkRegex = /<a([^>]*?)href="(https:\/\/github\.com\/[^/"\s]+\/[^/"\s]+\/(?:issues|pull)\/(\d+))"([^>]*)>\2<\/a>/g

export const compactGithubIssueLinks = (html: string): string => {
  return html.replaceAll(githubIssueLinkRegex, '<a$1href="$2"$4>#$3</a>')
}
