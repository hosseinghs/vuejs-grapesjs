import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'
import './styles/grapejs.scss'
import './styles/main.sass'
import grapesjsConfig from './grapesjsConfig'
import loadBodyColorTrait from './traits/bodyColor'
import { apiSandbox, refreshToken, setTokens } from './utils'
import { AUTH_API_URL, SETTING_API_URL, THEME_API_URL } from './api-url'

async function fetchSettings () {
  const { data } = await apiSandbox.get(SETTING_API_URL.setting)
  const head = document.head
  document.title = `شخصی‌سازی قالب وبسایت ${data.title} - داشبورد مدیریت`
  data.favicon.forEach(({ type, href }) => {
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = type
    link.href = `${data.images_prefix.server}${href}`
    head.appendChild(link)
  })
  window.settings = data
}
async function initializing () {
  // set tokens from query params when redirected from ibdok auth
  setTokens()
  await apiSandbox.get(AUTH_API_URL.me)
  await fetchSettings()
  const editor = grapesjs.init(grapesjsConfig)
  const commands = editor.Commands
  commands.add('show-traits', {
    getTraitsEl (editor) {
      const row = editor.getContainer().closest('.editor-row')
      return row.querySelector('.traits-container')
    },
    run (editor) {
      this.getTraitsEl(editor).style.display = ''
    },
    stop (editor) {
      this.getTraitsEl(editor).style.display = 'none'
    }
  })
  commands.add('show-layers', {
    getRowEl (editor) { return editor.getContainer().closest('.editor-row') },
    getLayersEl (row) { return row.querySelector('.layers-container') },
    run (editor) {
      const lmEl = this.getLayersEl(this.getRowEl(editor))
      lmEl.style.display = ''
    },
    stop (editor) {
      const lmEl = this.getLayersEl(this.getRowEl(editor))
      lmEl.style.display = 'none'
    }
  })
  commands.add('show-styles', {
    getRowEl (editor) { return editor.getContainer().closest('.editor-row') },
    getStyleEl (row) { return row.querySelector('.styles-container') },
    run (editor) {
      const smEl = this.getStyleEl(this.getRowEl(editor))
      smEl.style.display = ''
    },
    stop (editor) {
      const smEl = this.getStyleEl(this.getRowEl(editor))
      smEl.style.display = 'none'
    }
  })
  commands.add('update-component', {
    run (editor) {
      const sel = editor.getSelected()
      const type = sel.get('type')
      sel.replaceWith({ type })
    }
  })
  commands.add('save-pages', async (editor, sender) => {
    const headerComponent = editor.Pages.getMain().getMainComponent().findType('bd-navbar')[0]
    const footerComponent = editor.Pages.getMain().getMainComponent().findType('bd-footer')[0]
    const body = editor.Pages.getAll().map(page => ({
      id: page.getId(),
      name: page.getName(),
      path: page.get('path'),
      html: page.getMainComponent().toHTML({ tag: 'div' })
        .replace(/&#039;/g, '\'')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>'),
      js: editor.getJs({ component: page.getMainComponent() }),
      css: editor.getCss({
        component: page.getMainComponent(),
        avoidProtected: true
      }),
      default: page.get('default'),
      description: page.get('description')
    }))
    if (headerComponent) {
      body.push({
        name: 'header',
        html: headerComponent.toHTML(),
        js: editor.getJs({ component: headerComponent }),
        css: editor.getCss({
          component: headerComponent,
          avoidProtected: true
        })
      })
    }
    if (footerComponent) {
      body.push({
        name: 'footer',
        html: footerComponent.toHTML(),
        js: editor.getJs({ component: footerComponent }),
        css: editor.getCss({
          component: footerComponent,
          avoidProtected: true
        })
      })
    }
    sender.set('disable', true)
    try {
      await Promise.all([
        editor.store(),
        apiSandbox.post(THEME_API_URL.page, body)
      ])
      const notify = document.querySelector('div.notify')
      notify.style.visibility = 'visible'
      setTimeout(() => (notify.style.visibility = ''), 3000)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      sender.set('active', false)
      sender.set('disable', false)
    }
  })
  commands.add('set-device-desktop', {
    run: editor => editor.setDevice('Desktop')
  })
  commands.add('set-device-tablet', {
    run: editor => editor.setDevice('Tablet')
  })
  commands.add('set-device-mobile', {
    run: editor => editor.setDevice('Mobile')
  })
  editor.on('storage:error', error => {
    console.log(error)
    // const parseErorr = JSON.parse(error)
    // if (parseErorr.detail === 'refresh') refreshToken()
  })
  editor.on('asset:upload:error', error => {
    const parseErorr = JSON.parse(error)
    if (parseErorr.detail === 'refresh') refreshToken()
  })
  editor.on('asset:upload:response', response => {
    const { filename, server } = response.data
    editor.Assets.add(`${server}${filename}`)
  })
  editor.on('page:select', page => {
    const pageNameWrapper = document.querySelector('div.page-name')
    pageNameWrapper.innerHTML = page.getName()
  })
  editor.on('load', () => {
    loadBodyColorTrait(editor)
    editor.StyleManager.addProperty('flex', {
      type: 'number',
      label: 'Gap',
      property: 'gap',
      default: 0,
      units: ['px', '%'],
      min: 0
    })
  })
  window.editor = editor
}
initializing()