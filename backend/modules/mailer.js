const nodemailer = require('nodemailer');

const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host : "smtp.mailtrap.io",
    port : 2525,
    auth : {
        user : "9ecccc27d4599b",
        pass : "de02dfd713a7ca"
    }
});

transport.use('compile', hbs({
    viewEngine : 'handlebars',
    viewPath : '../resources/mail/',
    extName : '.html',
}))

module.exports = transport;