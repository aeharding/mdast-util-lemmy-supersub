/**
 * @typedef {import('mdast').Nodes} Nodes
 * @typedef {import('mdast').Paragraph} Paragraph
 *
 * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-from-markdown').Token} Token
 *
 * @typedef {import('../index.js').Sub} Sub
 * @typedef {import('../index.js').Sup} Sup
 */

/**
 * Create an extension for `mdast-util-from-markdown` to enable sub and sup in
 * markdown.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown` to enable sub and sup.
 */
export function supersubFromMarkdown() {
  return {
    enter: {
      sup: enterSup,
      sub: enterSub
    },
    exit: {
      sup: exit,
      sub: exit
    }
  }
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterSup(token) {
  this.enter({type: 'sup', children: [], data: {hName: 'sup'}}, token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterSub(token) {
  this.enter({type: 'sub', children: [], data: {hName: 'sub'}}, token)
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exit(token) {
  this.exit(token)
}
