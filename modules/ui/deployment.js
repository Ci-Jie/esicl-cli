import axios from 'axios'
import {
  esicl,
  kubernetes
} from '../../env'

const template = '{"apiVersion": "apps/v1","kind": "Deployment","metadata": {"name": "esicl-ui","namespace": "esicl","labels": {"app": "esicl-ui"}},"spec": {"replicas": 1,"selector": {"matchLabels": {"app": "esicl-ui"}},"template": {"metadata": {"name": "esicl-ui-pod","labels": {"app": "esicl-ui"}},"spec": {"containers": [{"name": "esicl-ui-container","image": "cijie/nutc-dashboard-ui:1.1.0","env": [{"name": "API_IP","value": "10.20.0.56"},{"name": "API_PORT","value": "30005"}],"ports": [{"containerPort": 8080}],"livenessProbe": {"httpGet": {"path": "/","port": 8080},"initialDelaySeconds": 30,"periodSeconds": 10}}]}}}}'

const create = () => {
  return new Promise(resolve => {
    let obj = JSON.parse(template)
    obj.metadata.name = esicl.ui.name
    obj.metadata.namespace = esicl.namespace
    obj.spec.replicas = esicl.ui.replicas
    obj.spec.template.spec.containers[0].image = esicl.ui.image
    obj.spec.template.spec.containers[0].env[0].value = kubernetes.master.ip
    obj.spec.template.spec.containers[0].env[1].value = esicl.api.port.toString()
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
    axios.delete(`https://${ kubernetes.master.ip }:6443/apis/apps/v1/namespaces/${ esicl.namespace }/deployments/${ esicl.ui.name }`, {
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