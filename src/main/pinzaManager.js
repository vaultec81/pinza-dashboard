const Daemon = require('pinza/src/cli/daemon');
const pinzaUtils = require('pinza/src/cli/utils');
const { ipcMain } = require('electron');
const promiseIpc = require('electron-promise-ipc');
const debug = require('debug');
const utils = require('./utils').default;
const fs = require('fs');

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
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }
    start() { 
        return new Promise(async(resolve, reject) => {
            var { ipfs } = await utils.ipfs.getIpfs();
            
            if(!ipfs) {
                return reject("Ipfs not running")
            }

            this.daemon = new Daemon({
                repoPath: pinzaUtils.getRepoPath()
            })
            if(!fs.existsSync(pinzaUtils.getRepoPath())) {
                this.daemon.client.init()
            }
            await this.daemon.start();
            this.daemon._apiEndpoints((apiAddr) => {
                return resolve(apiAddr);
            })
        })
    }
    async stop() {
        //Error prevention if daemon is not running
        if(this.daemon) {
            await this.daemon.stop();
        }
    }
}
export default pinzaManager;