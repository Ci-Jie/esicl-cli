import axios from 'axios'
import {
  esicl,
  kubernetes
} from '../env'

const template = '{"apiVersion": "v1","kind": "Namespace","metadata": {"name": "esicl"}}'

const create = () => {
  return new Promise(resolve => {
    let obj = JSON.parse(template)
    obj.metadata.name = esicl.namespace
    axios.post(`https://${ kubernetes.master.ip }:6443/api/v1/namespaces`, obj, {
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
    axios.delete(`https://${ kubernetes.master.ip }:6443/api/v1/namespaces/${ esicl.namespace }`, {
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