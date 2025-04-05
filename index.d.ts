import type {Parent} from 'mdast'

export {supersubFromMarkdown} from './lib/index.js'

export interface Sub extends Parent {
  /**
   * Node type of container sub.
   */
  type: 'sub'
}

export interface Sup extends Parent {
  /**
   * Node type of container sup.
   */
  type: 'sup'
}

// Add custom data tracked to turn a syntax tree into markdown.
declare module 'mdast-util-to-markdown' {
  interface ConstructNameMap {
    /**
     * Whole container sub.
     *
     * ```markdown
     * > | :::a
     *     ^^^^
     * > | :::
     *     ^^^
     * ```
     */
    sub: 'sub'
    sup: 'sup'
  }
}

// Add nodes to content, register `data` on paragraph.
declare module 'mdast' {
  interface RootContentMap {
    /**
     * Sub in flow content (such as in the root document, or block
     * quotes), which contains further flow content.
     */
    sub: Sub
    sup: Sup
  }

  interface PhrasingContentMap {
    /**
     * Sub in flow content (such as in the root document, or block
     * quotes), which contains further flow content.
     */
    sub: Sub
    sup: Sup
  }
}
