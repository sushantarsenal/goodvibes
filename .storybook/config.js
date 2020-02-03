import {addParameters, configure} from '@storybook/react'
import requireContext from 'require-context.macro'

addParameters({
  options: {
    panelPosition: 'right',
  },
})
const req = requireContext('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
