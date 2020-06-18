const Path = require('path')
const os = require('os');
const fs = require('fs')
const IpfsClient = require('ipfs-http-client')
const { exec, spawn } = require('child_process');
const path = require('path');
const { HTTPClient:PinzaClient } = require('pinza')
//const goIpfs = require('go-ipfs-dep')


//work around for go-ipfs-dep not working correctly with electron paths
const ipfsPaths = [
    path.resolve(path.join(__dirname, '..', 'go-ipfs', 'ipfs')),
    path.resolve(path.join(__dirname, '..', 'go-ipfs', 'ipfs.exe')),
    path.resolve(path.join(__dirname, '..', 'node_modules', 'go-ipfs-dep', 'go-ipfs', 'ipfs.exe')),
    path.resolve(path.join(__dirname, '..', 'node_modules', 'go-ipfs-dep', 'go-ipfs', 'ipfs')),
    path.resolve(path.join(__dirname, '..', '..', '..', '..', '..', 'go-ipfs-dep', 'go-ipfs', 'ipfs.exe')),
    path.resolve(path.join(__dirname, '..', '..', '..', '..', '..', 'go-ipfs-dep', 'go-ipfs', 'ipfs'))
]
let goIpfs;
for (const bin of ipfsPaths) {
    if (fs.existsSync(bin)) {
        goIpfs = bin;
    }
}

async function getIpfs() {
    const pinzaPath = Path.join(os.homedir(), ".js-pinza")

    let ipfsPath;
    if (process.env.IPFS_Path) {
        ipfsPath = process.env.IPFS_Path;
    } else {
        ipfsPath = Path.join(os.homedir(), ".ipfs");
    }

    let exists;
    let apiAddr;
    let isLocked;
    let ipfs;
    if (fs.existsSync(ipfsPath)) {
        exists = true;
        if (fs.existsSync(Path.join(ipfsPath, "api"))) {
            apiAddr = fs.readFileSync(Path.join(ipfsPath, "api")).toString()
        }
        if (fs.existsSync(Path.join(ipfsPath, "repo.lock"))) {
            isLocked = true;
        } else {
            isLocked = false;
        }
    } else {
        exists = false;
        if (fs.existsSync(Path.join(pinzaPath, "config"))) {
            var pinzaConfig = JSON.parse(fs.readFileSync(Path.join(pinzaPath, "config")).toString())
            apiAddr = pinzaConfig.ipfs.apiAddr;
        }
    }


    if (apiAddr) {
        ipfs = new IpfsClient(apiAddr);
        try {
            await ipfs.config.get("")
        } catch {
            ipfs = null;
        }
    }

    return {
        isLocked,
        exists,
        ipfsPath,
        ipfs,
        apiAddr
    }
}

async function getPinza() {
    let pinzaPath;
    if (process.env.Pinza_Path) {
        pinzaPath = process.env.Pinza_Path;
    } else {
        pinzaPath = Path.join(os.homedir(), ".js-pinza")
    }

    let exists;
    let apiAddr;
    let isLocked;
    let pinza;
    if (fs.existsSync(pinzaPath)) {
        exists = true;
        if (fs.existsSync(Path.join(pinzaPath, "apiAddr"))) {
            apiAddr = fs.readFileSync(Path.join(pinzaPath, "apiAddr")).toString()
        }
        if (fs.existsSync(Path.join(pinzaPath, "repo.lock"))) {
            isLocked = true;
        } else {
            isLocked = false;
        }
    } else {
        exists = false;
    }


    if (apiAddr) {
        pinza = new PinzaClient(apiAddr);
        try {
            await pinza.config.get("")
        } catch {
            pinza = null;
        }
    }

    return {
        isLocked,
        exists,
        pinzaPath,
        pinza,
        apiAddr
    }
}

var defaultIpfsConfig = {
    "HTTPHeaders": {
        "Access-Control-Allow-Credentials": [
            "true"
        ],
        "Access-Control-Allow-Headers": [
            "Authorization"
        ],
        "Access-Control-Allow-Origin": [
            "*"
        ],
        "Access-Control-Expose-Headers": [
            "Location"
        ],
        "HTTPHeaders.Access-Control-Allow-Methods": [
            "PUT",
            "POST",
            "GET"
        ]
    }
}
export default {
    ipfs: {
        getIpfs,
        init: (repoPath, goIpfsPath) => {
            if (!goIpfsPath) {
                goIpfsPath = goIpfs;
            }
            return new Promise((resolve, reject) => {
                exec(`${goIpfsPath} init`, {
                    env: {
                        IPFS_Path: repoPath
                    }
                }, () => {
                    //console.log(`${goIpfsPath} config --json API ${JSON.stringify(JSON.stringify(defaultIpfsConfigs))}`)
                    exec(`${goIpfsPath} config --json API ${JSON.stringify(JSON.stringify(defaultIpfsConfig))}`, {
                        env: {
                            IPFS_Path: repoPath
                        }
                    }, () => {
                        resolve()
                    })
                });
            })
        },
        run: (repoPath, goIpfsPath) => {
            if (!goIpfsPath) {
                goIpfsPath = goIpfs;
            }
            var ipfsDaemon = spawn(goIpfsPath, [
                "daemon",
                "--enable-pubsub-experiment"
            ], {
                env: {
                    IPFS_Path: repoPath
                },
                detached: true
            });
            return ipfsDaemon.pid;
        }
    },
    getPinza,
    formToObj: (formData) => {
        let out = {};
        for(var key of formData.keys()) {
            out[key] = formData.get(key);
        }
        return out;
    }
}