const activationEventNames: readonly string[] = [
  'onBraceCompletion',
  'onClosingTag',
  'onCodeAction',
  'onCommand',
  'onCompletion',
  'onDebug',
  'onDefinition',
  'onDiagnostic',
  'onFileSystem',
  'onFormatting',
  'onHover',
  'onImplementation',
  'onLanguage',
  'onOutput',
  'onReferences',
  'onRename',
  'onSemanticTokens',
  'onSignatureHelp',
  'onSourceControl',
  'onStartupFinished',
  'onStatusBarItem',
  'onTabCompletion',
  'onTextSearch',
  'onTypeDefinition',
  'onUri',
  'onView',
  'onWebView',
]

const maximumSuggestionDistance = 2

const getEditDistance = (actual: string, expected: string): number => {
  const previous: number[] = Array.from({ length: expected.length + 1 }, (_, index) => index)
  const current: number[] = [...previous]
  for (let actualIndex = 1; actualIndex <= actual.length; actualIndex++) {
    current[0] = actualIndex
    for (let expectedIndex = 1; expectedIndex <= expected.length; expectedIndex++) {
      const substitutionCost = actual[actualIndex - 1] === expected[expectedIndex - 1] ? 0 : 1
      current[expectedIndex] = Math.min(current[expectedIndex - 1] + 1, previous[expectedIndex] + 1, previous[expectedIndex - 1] + substitutionCost)
    }
    previous.splice(0, previous.length, ...current)
  }
  return previous[expected.length]
}

export const getActivationEventSuggestion = (activationEvent: string): string => {
  const separatorIndex = activationEvent.indexOf(':')
  const name = separatorIndex === -1 ? activationEvent : activationEvent.slice(0, separatorIndex)
  if (name === '*' || activationEventNames.includes(name)) {
    return ''
  }

  let closestName = ''
  let closestDistance = Number.POSITIVE_INFINITY
  let isAmbiguous = false
  for (const activationEventName of activationEventNames) {
    const distance = getEditDistance(name, activationEventName)
    if (distance < closestDistance) {
      closestDistance = distance
      closestName = activationEventName
      isAmbiguous = false
    } else if (distance === closestDistance) {
      isAmbiguous = true
    }
  }
  if (closestDistance > maximumSuggestionDistance || isAmbiguous) {
    return ''
  }
  return `${closestName}${activationEvent.slice(name.length)}`
}
