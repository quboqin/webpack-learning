import '../../assets/scss/app.scss'
import hello from './views/hello.js'

console.log('Its a client app')
hello()

import { PathHistory } from 'spa-history'

const history = new PathHistory({
  async change(location) {
    // 使用import()将加载的js文件分开打包, 这样实现了仅加载访问的页面
    const module = await import(/* webpackChunkName: "page" */ './views' + location.path + '/index.js')
    // export default ... 的内容通过module.default访问
    const View = module.default
    const view = new View()
    view.mount(document.body)
  }
})

document.body.addEventListener('click', e => history.captureLinkClickEvent(e))
history.start()