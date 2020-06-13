const Daemon = require('pinza/src/cli/daemon');
const pinzaUtils = require('pinza/src/cli/utils');
const { ipcMain } = require('electron');
const promiseIpc = require('electron-promise-ipc');
const debug = require('debug');
const utils = require('./utils')

class pinzaManager {
    constructor() {
        promiseIpc.on("pinza.start", async (event, arg) => {
            debug("Start requested")
            return await this.start();
        })
        promiseIpc.on("pinza.stop", async (event, arg) => {
            debug("stop requested for pinza")
            return await this.stop();
        })
    }
    start() { 
        return new Promise(async(resolve, reject) => {
            var { ipfs } = await utils.ipfs.getIpfs();
            
            if(!ipfs) {
                return reject("Ipfs not running")
            }

            this.daemon = new Daemon(ipfs, {
                repoPath: pinzaUtils.getRepoPath()
            })
            await this.daemon.start();
            this._apiEndpoints((apiAddr) => {
                return resolve(apiAddr);
            })
        })
    }
    async stop() {
        await this.daemon.stop();
    }
}
module.exports = pinzaManager;