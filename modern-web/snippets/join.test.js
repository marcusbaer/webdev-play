import { expect } from '@esm-bundle/chai'

it('joins an array to a string', () => {
  expect(['a', 'b'].join('-')).to.equal('a-b')
  expect(['a', 'b'].join('')).to.equal('ab')
})
