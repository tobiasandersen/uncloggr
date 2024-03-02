import YAML from 'yaml'

const dtf = new Intl.DateTimeFormat('sv-SE', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3,
})

export function formatTime(time) {
  if (!time) {
    return '?'
  }
  const date = new Date(time)
  if (isNaN(date)) {
    return '<invalid date>'
  }
  return dtf.format(date)
}

export function formatLevel(level) {
  if (level == null || !Number.isFinite(level)) {
    return '?'
  }
  if (level >= 60) {
    return 'FATAL'
  } else if (level >= 50) {
    return 'ERROR'
  } else if (level >= 40) {
    return 'WARNING'
  } else if (level >= 30) {
    return 'INFO'
  } else if (level >= 20) {
    return 'DEBUG'
  } else {
    return 'TRACE'
  }
}

export function formatObject(obj, opts) {
  return YAML.stringify(obj, { blockQuote: 'literal', aliasDuplicateObjects: false, ...opts })
}

export function formatRest(rest) {
  return Object.entries(rest)
    .map(([key, value]) => `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`)
    .join(' ')
}
