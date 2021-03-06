const http = require('http');
const querystring = require('querystring');

module.exports = function (params) {
    return new Promise((resolve, reject) => {
        if (!params.sendkey) {
            params.sendkey = process.env.PUSHBEAR_SENDkEY;
        }
        const data = querystring.stringify(params);
        const options = {
            hostname: 'pushbear.ftqq.com',
            port: 80,
            path: '/sub',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length': Buffer.byteLength(data)
            }
        };
        const req = http.request(options, res => {
            res.setEncoding('utf8');
            let info = '';
            res.on('data', chunk => {
                info += chunk;
                // console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log(JSON.stringify(info, 0, 2));
                resolve(info);
            });
        });

        req.on('error', err => {
            console.error(`problem with request: ${err.message}`);
            reject(err);
        });

        // write data to request body
        req.write(data);
        req.end();
    });

}