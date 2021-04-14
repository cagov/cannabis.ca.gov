import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {html} from "@codemirror/lang-html"

let editor = new EditorView({
  state: EditorState.create({
    doc: document.querySelector('.card-grid-sample').innerHTML,
    extensions: [basicSetup, html()]
  }),
  parent: document.querySelector('.card-grid-code')
})


let featuredItemEditor = new EditorView({
  state: EditorState.create({
    doc: document.querySelector('.featured-item-sidebar-sample').innerHTML,
    extensions: [basicSetup, html()]
  }),
  parent: document.querySelector('.featured-item-sidebar-code')
})


let footerEditor = new EditorView({
  state: EditorState.create({
    doc: document.querySelector('footer').outerHTML,
    extensions: [basicSetup, html()]
  }),
  parent: document.querySelector('.footer-code')
})

let highlightEditor = new EditorView({
  state: EditorState.create({
    doc: document.querySelector('.highlight-sample').innerHTML,
    extensions: [basicSetup, html()]
  }),
  parent: document.querySelector('.highlight-code')
})
