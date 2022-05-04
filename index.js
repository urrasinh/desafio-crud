const http = require('http')

const url = require('url')

const fs = require('fs')

http
    .createServer(function (req, res) {

        const params = url.parse(req.url, true).query
        const nombre = params.archivo
        const contenido = params.contenido
        const nuevoNombre = params.nuevoNombre

        if (req.url.includes('/crear')) {
            if (nombre) {
                fs.writeFile(nombre, contenido, () => {
                    res.write('Archivo creado con éxito!')
                    res.end()
                })
            } else {
                res.write('el archivo no ha sido creado')
                res.end()
            }
        }

        if (req.url.includes('/leer')) {

            fs.readFile(nombre, (err, data) => {
                if (err) {
                    res.write('error archivo no leido')
                    res.end()
                } else {
                    res.write(data)
                    res.end()
                }
            })

        }

        if (req.url.includes('/renombrar')) {
            fs.rename(nombre, nuevoNombre, (err, data) => {
                if (err) {
                    res.write('error archivo no renombrado')
                    res.end()
                } else {
                    res.write(`Archivo ${nombre} renombrado por ${nuevoNombre}`)
                    res.end()
                }
            })
        
    }

    if (req.url.includes('/eliminar')) {
    fs.unlink(nombre, (err, data) => {
        if (err) {
            res.write('error archivo no eliminado')
            res.end()
        } else {
            res.write(`Archivo ${nombre} eliminado con éxito`)
        res.end()
        }
    })
}

    })
    .listen(8080, () => console.log('Escuchando el puerto 8080'))


