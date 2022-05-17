const http = require("http");
const host = 'localhost';
const port = 8080;

let notes = JSON.stringify([
    { id: '89289', content: 'Гуси отличаются клювом, имеющим при основании большую высоту, чем ширину, и оканчивающимся ноготком с острым краем. По краям клюва идут мелкие зубчики.' },
    { id: 'mi9j', content: 'Перья и пух сильно развиты. Самцы практически не отличаются от самок — отличия состоят лишь в костном наросте («горбинке») в начале клюва у переносицы самца, а также в несколько более крупном размере тела.' }
]);

const requestListener = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, application/json, accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    let methodReq = req.method;
    console.log(methodReq);
    switch (req.url) {
        case "/notes":
            if (methodReq == "POST") {
                let data = '';
                req.on('data', function (chunk) {
                    data += chunk.toString();
                });
                req.on('end', function () {
                    let obj = JSON.parse(notes);
                    obj.push(JSON.parse(data));                 
                    notes = JSON.stringify(obj);
                    res.writeHead(200);
                    res.end(notes);
                });
                break;
            }
            if (methodReq == "GET") {
                res.writeHead(200);
                res.end(notes);
                break;
            }
            if (methodReq == "OPTIONS") {
                res.setHeader('200', 'OK');
                res.setHeader('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'API-Key, Content-Type, If-Modified-Since, Cache-Control');
                res.setHeader('Access-Control-Max-Age', '86400'); 
                res.writeHead(200);
                break
    }
            if (methodReq == "DELETE") {
                let data = '';
                req.on('data', function (chunk) {
                    data += chunk.toString();
                });
                req.on('end', function () {
                    let obj = JSON.parse(notes);
                    obj = obj.filter(item => item.id != JSON.parse(data));
                    notes = JSON.stringify(obj);
                    res.writeHead(200);
                    res.end(notes);
                });
                break; 
            }
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Resource not found" }));
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
