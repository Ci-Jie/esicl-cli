import signale from 'signale'

const clean = () => {
  signale.start('cleaning ESICL service...')
}

const start = () => {
  signale.start('Building ESICL service...')
}

const show = (content, status) => {
  if (status === 200 || status === 201) signale.success(content)
  else signale.error(`${ content} (${ status })`)
}

export {
  clean,
  show,
  start
}