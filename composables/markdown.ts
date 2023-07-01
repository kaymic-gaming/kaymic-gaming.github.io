import { marked } from 'marked'

const renderer = new marked.Renderer()

renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}"
  ${title ? `title="${title}"` : ''}
  >${text}</a>`
}

export const useMarkdown = (body?: string) =>
  body ? marked(body, { renderer }) : ''
