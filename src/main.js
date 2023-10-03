const http = require("http")
const routes = require("./routes")

const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url)

    try {
        const response =  await routes.getContent(req.method, req.url)
        res.writeHead(response.status, response.headers)
        res.end(response.body)
    }
    catch (err) {
        console.error(err)
        res.writeHead(500, {"Content-Type": "text/plain"})
        res.end("Oops.\n")
    }
    
}).listen(9001)

server.on("listening", () => {
    console.log("Server active.")
})
