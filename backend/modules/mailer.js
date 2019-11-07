const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "9ecccc27d4599b",
        pass: "de02dfd713a7ca"
    }
});

const handlebarsOptions = {
    viewEngine: {
        extName: '.html',
        partialsDir: path.resolve('./backend/resources/mail/'),
        layoutsDir: path.resolve('./backend/resources/mail/'),
        defaultLayout: '',
    },
    viewPath: path.resolve('./backend/resources/mail/'),
    extName: '.html',
};

transport.use('compile', hbs(handlebarsOptions));

module.exports = transport;