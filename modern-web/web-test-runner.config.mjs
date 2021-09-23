// import { storybookPlugin } from '@web/dev-server-storybook'
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin'

export default {
  plugins: [
    // type can be 'web-components' or 'preact'
    // storybookPlugin({ type: 'web-components' }),
    visualRegressionPlugin({
      update: process.argv.includes('--update-visual-baseline')
    })
  ]
}
