// rehype-highlight bundles every language lowlight knows (~190) unless you
// hand it a specific set. That's the majority of the JS bundle size for a
// blog that's realistically only ever going to show a handful of languages.
// Add more `import` lines here if a post needs a language not listed.

import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import xml from 'highlight.js/lib/languages/xml' // covers html too
import http from 'highlight.js/lib/languages/http'
import diff from 'highlight.js/lib/languages/diff'
import ini from 'highlight.js/lib/languages/ini' // covers config/.env-ish files
import plaintext from 'highlight.js/lib/languages/plaintext'

export const highlightLanguages = {
  bash, sh: bash, shell: bash, zsh: bash,
  python, py: python,
  javascript, js: javascript,
  typescript, ts: typescript,
  json,
  sql,
  yaml, yml: yaml,
  xml, html: xml,
  http,
  diff, patch: diff,
  ini, toml: ini,
  plaintext, text: plaintext,
}
