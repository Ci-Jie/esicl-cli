import axios from 'axios'
import {
  esicl,
  kubernetes
} from '../../env'

const template = '{"apiVersion": "v1","kind": "Service","metadata": {"name": "esicl-api","namespace": "esicl"},"spec": {"type": "NodePort","ports": [{"name": "http","protocol": "TCP","port": 3001,"targetPort": 3001,"nodePort": 30003}],"selector": {"app": "esicl-api"}}}'

const create = () => {
  return new Promise(resolve => {
    let obj = JSON.parse(template)
    obj.metadata.name = esicl.api.name
    obj.metadata.namespace = esicl.namespace
    obj.spec.ports[0].nodePort = esicl.api.port
    axios.post(`https://${ kubernetes.master.ip }:6443/api/v1/namespaces/${ esicl.namespace }/services`, obj, {
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
    axios.delete(`https://${ kubernetes.master.ip }:6443/api/v1/namespaces/${ esicl.namespace }/services/${ esicl.api.name }`, {
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