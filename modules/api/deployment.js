import axios from 'axios'
import {
  esicl,
  kubernetes
} from '../../env'

const template = '{"apiVersion": "apps/v1","kind": "Deployment","metadata": {"name": "esicl-api","namespace": "esicl","labels": {"app": "esicl-api"}},"spec": {"replicas": 1,"selector": {"matchLabels": {"app": "esicl-api"}},"template": {"metadata": {"name": "esicl-api-pod","labels": {"app": "esicl-api"}},"spec": {"containers": [{"name": "esicl-api-container","image": "cijie/nutc-dashboard-api:1.0.0","ports": [{"containerPort": 3001}],"livenessProbe": {"httpGet": {"path": "/","port": 3001},"initialDelaySeconds": 30,"periodSeconds": 10}}]}}}}'

const create = () => {
  return new Promise(resolve => {
    let obj = JSON.parse(template)
    obj.metadata.name = esicl.api.name
    obj.metadata.namespace = esicl.namespace
    obj.metadata.labels.app = esicl.api.name
    obj.spec.selector.matchLabels.app = esicl.api.name
    obj.spec.replicas = esicl.api.replicas
    obj.spec.template.metadata.labels.app = esicl.api.name
    obj.spec.template.spec.containers.image = esicl.api.image
    axios.post(`https://${ kubernetes.master.ip }:6443/apis/apps/v1/namespaces/${ esicl.namespace }/deployments`, obj, {
        headers: {
          'Authorization': `Bearer ${ kubernetes.admin.token }`,
          'Content-Type': 'application/yaml'
        }
      })
      .then(response => {
        resolve(response.status)
      })
      .catch(error => {
        resolve(error.response.status)
      })
  })
}

const remove = () => {
  return new Promise(resolve => {
    axios.delete(`https://${ kubernetes.master.ip }:6443/apis/apps/v1/namespaces/${ esicl.namespace }/deployments/${ esicl.api.name }`, {
        headers: {
          'Authorization': `Bearer ${ kubernetes.admin.token }`,
          'Content-Type': 'application/yaml'
        }
      })
      .then(response => {
        resolve(response.status)
      })
      .catch(error => {
        resolve(error.response.status)
      })
  })
}

export {
  create,
  remove
}