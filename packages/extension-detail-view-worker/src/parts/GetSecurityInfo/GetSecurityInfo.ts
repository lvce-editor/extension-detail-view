import type { SecurityEntry } from '../SecurityEntry/SecurityEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

const automaticActivationEvents = new Set(['*', 'onStartup', 'onStartupFinished'])
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

const getEmbeddedWebContentCount = (extension: any): number => {
  const webViewCount = asArray(extension?.webViews).length
  const iframeViewCount = asArray(extension?.views).filter((view) => view?.iframe).length
  return webViewCount + iframeViewCount
}

const getExternalNetworkEntry = (
  hasNodeCode: boolean,
  hasBrowserCode: boolean,
  isIsolated: boolean,
  externalSources: readonly string[],
): Pick<SecurityEntry, 'access' | 'details'> => {
  if (hasNodeCode) {
    return { access: 'Unrestricted', details: 'Node.js extensions can connect to any external service.' }
  }
  if (hasBrowserCode && !isIsolated) {
    return { access: 'Unrestricted', details: 'Shared browser extensions run with unrestricted network access.' }
  }
  if (externalSources.includes('*')) {
    return { access: 'Unrestricted', details: 'The manifest declares connect-src *.' }
  }
  if (externalSources.length > 0) {
    return { access: 'Restricted', details: externalSources.join(', ') }
  }
  return { access: 'None declared', details: 'No external services are declared by the extension or its embedded web content.' }
}

const getNodeCodeEntry = (hasNodeCode: boolean, main: unknown): SecurityEntry => {
  return {
    access: hasNodeCode ? 'Yes' : 'No',
    details: hasNodeCode ? `Runs ${main} with Node.js APIs.` : 'No Node.js entry point is declared.',
    id: 'NodeJsCode',
    label: ExtensionDetailStrings.securityNodeJsCode(),
  }
}

const getBrowserCodeEntry = (hasBrowserCode: boolean, browser: unknown): SecurityEntry => {
  return {
    access: hasBrowserCode ? 'Yes' : 'No',
    details: hasBrowserCode ? `Runs ${browser} in a browser worker.` : 'No browser entry point is declared.',
    id: 'BrowserCode',
    label: ExtensionDetailStrings.securityBrowserCode(),
  }
}

const getIsolationEntry = (hasBrowserCode: boolean, isIsolated: boolean): SecurityEntry => {
  if (isIsolated) {
    return {
      access: 'Isolated worker',
      details: 'Runs in a dedicated worker with a manifest-derived content security policy.',
      id: 'ExecutionIsolation',
      label: ExtensionDetailStrings.securityExecutionIsolation(),
    }
  }
  if (hasBrowserCode) {
    return {
      access: 'Shared extension host',
      details: 'Runs in the shared browser extension host.',
      id: 'ExecutionIsolation',
      label: ExtensionDetailStrings.securityExecutionIsolation(),
    }
  }
  return {
    access: 'Not applicable',
    details: 'The extension does not declare browser code.',
    id: 'ExecutionIsolation',
    label: ExtensionDetailStrings.securityExecutionIsolation(),
  }
}

const getWorkspaceFilesEntry = (hasExecutableCode: boolean): SecurityEntry => {
  return {
    access: hasExecutableCode ? 'Read and write' : 'Not available',
    details: hasExecutableCode ? 'Extension code can use the workspace file system API.' : 'No executable extension code is declared.',
    id: 'WorkspaceFiles',
    label: ExtensionDetailStrings.securityWorkspaceFiles(),
  }
}

const getLocalProcessesEntry = (hasNodeCode: boolean): SecurityEntry => {
  return {
    access: hasNodeCode ? 'Allowed' : 'Not available',
    details: hasNodeCode ? 'Node.js code can start local processes.' : 'Browser and declarative extensions cannot start local processes directly.',
    id: 'LocalProcesses',
    label: ExtensionDetailStrings.securityLocalProcesses(),
  }
}

const getAutomaticActivationEntry = (activatesAutomatically: boolean): SecurityEntry => {
  return {
    access: activatesAutomatically ? 'Yes' : 'No',
    details: activatesAutomatically ? 'The extension declares a startup activation event.' : 'The extension only activates for specific events.',
    id: 'AutomaticActivation',
    label: ExtensionDetailStrings.securityAutomaticActivation(),
  }
}

const getEmbeddedWebContentEntry = (count: number): SecurityEntry => {
  return {
    access: `${count}`,
    details: count > 0 ? 'The extension contributes embedded web content.' : 'No embedded web content is declared.',
    id: 'Webviews',
    label: ExtensionDetailStrings.securityWebviews(),
  }
}

const getDynamicCodeEntry = (allowsDynamicCode: boolean): SecurityEntry => {
  return {
    access: allowsDynamicCode ? 'Allowed' : 'Blocked',
    details: allowsDynamicCode
      ? 'Node.js or a declared content security policy permits dynamic code evaluation.'
      : 'Declared browser content security policies do not permit unsafe evaluation.',
    id: 'DynamicCodeEvaluation',
    label: ExtensionDetailStrings.securityDynamicCodeEvaluation(),
  }
}

export const getSecurityInfo = (extension: any): readonly SecurityEntry[] => {
  const hasNodeCode = isNonEmptyString(extension?.main)
  const hasBrowserCode = isNonEmptyString(extension?.browser)
  const hasExecutableCode = hasNodeCode || hasBrowserCode
  const isIsolated = hasBrowserCode && extension?.isolated === true
  const policies = getManifestPolicies(extension)
  const externalSources = getExternalSources(policies)
  const externalNetwork = getExternalNetworkEntry(hasNodeCode, hasBrowserCode, isIsolated, externalSources)
  const activation: readonly unknown[] = asArray(extension?.activation)
  const activatesAutomatically = activation.some((event: unknown) => typeof event === 'string' && automaticActivationEvents.has(event))
  const embeddedWebContentCount = getEmbeddedWebContentCount(extension)
  const allowsDynamicCode = hasNodeCode || getDirectiveSources(policies, 'script-src').includes("'unsafe-eval'")

  return [
    getNodeCodeEntry(hasNodeCode, extension?.main),
    getBrowserCodeEntry(hasBrowserCode, extension?.browser),
    getIsolationEntry(hasBrowserCode, isIsolated),
    {
      ...externalNetwork,
      id: 'ExternalConnections',
      label: ExtensionDetailStrings.securityExternalConnections(),
    },
    getWorkspaceFilesEntry(hasExecutableCode),
    getLocalProcessesEntry(hasNodeCode),
    getAutomaticActivationEntry(activatesAutomatically),
    getEmbeddedWebContentEntry(embeddedWebContentCount),
    getDynamicCodeEntry(allowsDynamicCode),
  ]
}
