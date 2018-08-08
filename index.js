#!/usr/bin/env babel-node

import commander from 'commander'
import * as console from './modules/console'
import * as namespace from './modules/namespace'
import * as apidp from './modules/api/deployment'
import * as uidp from './modules/ui/deployment'
import * as apisvc from './modules/api/service'
import * as uisvc from './modules/ui/service'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

commander
  .version('1.0.0')
  .description('This project is dashboard of service in Emerging Smart IoT Computing System Lab (ESICL). Including ICINGA, Kubernetes, Etherum and Smart Data Center.')

commander
  .command('build')
  .description('build the ESICL service in kubernetes')
  .action(() => {
    console.start()
    namespace.create().then(res => { 
      console.show('Create the namespace.', res)
      apidp.create().then(res => { console.show('Create the API deployment.', res) })
      apisvc.create().then(res => { console.show('Create the API service.', res) })
      uidp.create().then(res => { console.show('Create the UI deployment.', res) })
      uisvc.create().then(res => { console.show('Create the UI service.', res) })
    })
  })

commander
  .command('clean')
  .description('clean the ESICL service')
  .action(() => {
    console.clean()
    // uisvc.remove().then(res => { console.show('Remove the UI service.', res) })
    // uidp.remove().then(res => { console.show('Remove the UI deployment.', res) })
    // apisvc.remove().then(res => { console.show('Remove the API service.', res) })
    // apidp.remove().then(res => { console.show('Remove the API deployment.', res) })
    namespace.remove().then(res => { console.show('Remove the namespace.', res) })
  })

commander.parse(process.argv)