import type { SecurityEntry } from '../SecurityEntry/SecurityEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

const externalProtocols = new Set(['http:', 'https:', 'ws:', 'wss:'])
const whitespaceRegex = /\s+/

const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.length > 0
}

const getDirectiveSources = (policies: readonly unknown[], directiveName: string): readonly string[] => {
  const sources: string[] = []
  for (const policy of policies) {
    if (typeof policy !== 'string') {
      continue
    }
    for (const directive of policy.split(';')) {
      const [name, ...values] = directive.trim().split(whitespaceRegex)
      if (name === directiveName) {
        sources.push(...values)
      }
    }
  }
  return sources
}

const asArray = (value: unknown): readonly any[] => {
  return Array.isArray(value) ? value : []
}

const getNestedPolicies = (items: unknown): readonly unknown[] => {
  const policies: unknown[] = []
  for (const item of asArray(items)) {
    if (Array.isArray(item?.contentSecurityPolicy)) {
      policies.push(...item.contentSecurityPolicy)
    }
  }
  return policies
}

const getIframePolicies = (views: unknown): readonly string[] => {
  const policies: string[] = []
  for (const view of asArray(views)) {
    if (typeof view?.iframe?.csp === 'string') {
      policies.push(view.iframe.csp)
    }
  }
  return policies
}

const getManifestPolicies = (extension: any): readonly unknown[] => {
  return [
    ...asArray(extension?.contentSecurityPolicy),
    ...getNestedPolicies(extension?.rpc),
    ...getNestedPolicies(extension?.webViews),
    ...getIframePolicies(extension?.views),
  ]
}

const getExternalSources = (policies: readonly unknown[]): readonly string[] => {
  const sources = getDirectiveSources(policies, 'connect-src')
  const externalSources = new Set<string>()
  for (const source of sources) {
    if (source === '*') {
      externalSources.add(source)
      continue
    }
    try {
      const url = new URL(source)
      if (externalProtocols.has(url.protocol)) {
        externalSources.add(source)
      }
    } catch {
      // CSP keywords and relative sources are not external services.
    }
  }
  return [...externalSources]
}

const getNetworkRequests = (hasNodeCode: boolean, hasBrowserCode: boolean, isIsolated: boolean, externalSources: readonly string[]): string => {
  if (hasNodeCode || (hasBrowserCode && !isIsolated) || externalSources.includes('*')) {
    return 'Yes'
  }
  if (externalSources.length > 0) {
    return externalSources.join(', ')
  }
  return 'No'
}

export const getSecurityInfo = (extension: any): readonly SecurityEntry[] => {
  const hasNodeCode = isNonEmptyString(extension?.main)
  const hasBrowserCode = isNonEmptyString(extension?.browser)
  const isIsolated = hasBrowserCode && extension?.isolated === true
  const policies = getManifestPolicies(extension)
  const externalSources = getExternalSources(policies)

  return [
    {
      id: 'NetworkRequests',
      label: ExtensionDetailStrings.securityNetworkRequests(),
      value: getNetworkRequests(hasNodeCode, hasBrowserCode, isIsolated, externalSources),
    },
    {
      id: 'CodeExecution',
      label: ExtensionDetailStrings.securityCodeExecution(),
      value: hasBrowserCode ? 'Yes' : 'No',
    },
    {
      id: 'NodeJsCodeExecution',
      label: ExtensionDetailStrings.securityNodeJsCodeExecution(),
      value: hasNodeCode ? 'Yes' : 'No',
    },
  ]
}
