export default {
  action: {
    type: String
  },
  headers: {
    type: Object,
    default: {}
  },
  multiple: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: {}
  },
  name: {
    type: String,
    default: 'file'
  },
  'with-credentials': {
    type: Boolean,
    default: false
  },
  'show-file-list': {
    type: Boolean,
    default: true,
  },
  drag: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: ''
  },
  'list-type': {
    type: String,
    default: 'text' // text、picture、picture-card
  },
  'auto-upload': {
    type: Boolean,
    default: true
  },
  'file-list': {
    type: Array,
    default: []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: Infinity
  },
  'before-upload': {
    type: Function,
    default: () => {
      return true
    }
  },
  'before-remove': {
    type: Function,
    default: () => {
      return true
    }
  }
}