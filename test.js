import assert from 'node:assert/strict'
import test from 'node:test'
import {supersub} from 'micromark-extension-lemmy-supersub'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {removePosition} from 'unist-util-remove-position'
import {supersubFromMarkdown} from './lib/index.js'

test('core', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./lib/index.js')).sort(), [
      'supersubFromMarkdown'
    ])
  })
})

test('supersubFromMarkdown()', async function (t) {
  await t.test('should support sub', async function () {
    // @ts-expect-error
    const tree = fromMarkdown('hello ~world~ text', {
      extensions: [supersub],
      mdastExtensions: [supersubFromMarkdown()]
    })

    removePosition(tree, {force: true})

    assert.deepEqual(tree.children[0], {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'hello '
        },
        {
          type: 'sub',
          children: [
            {
              type: 'text',
              value: 'world'
            }
          ],
          data: {
            hName: 'sub'
          }
        },
        {
          type: 'text',
          value: ' text'
        }
      ]
    })
  })

  await t.test('should support sup', async function () {
    // @ts-expect-error
    const tree = fromMarkdown('hello ^world^ text', {
      extensions: [supersub],
      mdastExtensions: [supersubFromMarkdown()]
    })

    removePosition(tree, {force: true})

    assert.deepEqual(tree.children[0], {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'hello '
        },
        {
          type: 'sup',
          children: [
            {
              type: 'text',
              value: 'world'
            }
          ],
          data: {
            hName: 'sup'
          }
        },
        {
          type: 'text',
          value: ' text'
        }
      ]
    })
  })
})
