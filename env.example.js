const esicl = {
  namespace: 'esicl',
  api: {
    name: 'esicl-api',
    replicas: 1,
    image: 'cijie/esicl-api:1.0.0',
    port: 30017
  },
  ui: {
    name: 'esicl-ui',
    replicas: 1,
    image: 'cijie/esicl-ui:1.0.0',
    port: 30018
  }
}

const kubernetes = {
  admin: {
    token: '<admin-token>'
  },
  master: {
    ip: '<k8s-master-ip>'
  }
}

export {
  esicl,
  kubernetes
}
