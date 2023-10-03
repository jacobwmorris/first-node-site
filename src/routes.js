const { readFile } = require("fs/promises")

function pageResponse(body) {
    return {
        status: 200,
        headers: {
            "Content-Type": "text/html"
        },
        body
    } 
}

function notAllowedResponse() {
    return {
        status: 405,
        headers: {
            "Content-Type": "text/plain",
            "Allow": "GET"
        },
        body: "Method not allowed\n"
    }
}

function notFoundResponse(body) {
    return {
        status: 404,
        headers: {
            "Content-Type": "text/html"
        },
        body
    }
}

const routes = {}

routes["/"] = async function(verb) {
    if (verb === "GET") {
        return pageResponse(await readFile("./src/pages/index.html", "utf-8"))
    }
    
    return notAllowedResponse()
}

routes["/index"] = routes["/"]

routes["/about"] = async function(verb) {
    if (verb === "GET") {
        return pageResponse(await readFile("./src/pages/about.html", "utf-8"))
    }
    
    return notAllowedResponse()
}

routes["/contact-me"] = async function(verb) {
    if (verb === "GET") {
        return pageResponse(await readFile("./src/pages/contact-me.html", "utf-8"))
    }
    
    return notAllowedResponse()
}

routes.getContent = async function(verb, path) {
    const responseFunc = this[path]
    if (responseFunc === undefined) {
        return notFoundResponse(await readFile("./src/pages/not-found.html", "utf-8"))
    }

    return await responseFunc(verb)
}

module.exports = routes
