const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export function formatDate(ts) {
  const d = new Date(ts)
  const n = d.getDate()
  const suffix = (n % 10 === 1 && n !== 11) ? 'st'
    : (n % 10 === 2 && n !== 12) ? 'nd'
    : (n % 10 === 3 && n !== 13) ? 'rd' : 'th'
  return `${DAYS[d.getDay()]}, ${n}${suffix} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function excerpt(md, len = 160) {
  const stripped = (md || '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/[#*`>[\]!]/g, '')
    .trim()
  return stripped.length > len ? stripped.slice(0, len) + '…' : stripped
}
