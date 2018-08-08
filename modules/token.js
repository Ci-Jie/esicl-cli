import shell from '../node_modules/shelljs'
import {
  admin,
  kubernetes
} from '../env'

const get = () => {
  return shell.exec(`kubectl describe secret $(kubectl get secret -n kube-system | grep admin-user | awk '{print $1}') -n kube-system | grep token: | awk '{print $2}'`, {
    silent: true
  }).stdout.split('\n')[0]
}

export {
  get
}