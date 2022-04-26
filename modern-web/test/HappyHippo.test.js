import { expect } from '@esm-bundle/chai'
import HappyHippo from '../src/HappyHippo'

it('works', () => {
    expect(1+2).to.equal(3);
})

describe('HappyHippo', () => {
    it('has a tagName', () => {
        expect(HappyHippo.tagName).to.equal('happy-hippo');
    })

    it.skip('has a name', () => {
        expect(HappyHippo.name).to.equal('HappyHippo');
    })
})
