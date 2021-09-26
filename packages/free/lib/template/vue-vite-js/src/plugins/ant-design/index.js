



import {Switch} from 'ant-design-vue'

const plugins = [Switch]


export function setupAntd(app) {
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}