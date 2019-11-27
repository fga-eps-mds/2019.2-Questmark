const sgMail = require('@sendgrid/mail');
var key = process.env.SENDGRID;
sgMail.setApiKey(key);

describe("Teste de email",()=>{

  it('Deve enviar um email',()=>{
    const msg = {
      to: 'recipient@example.org',
      from: 'sender@example.org',
      subject: 'Hello world',
      text: 'Hello plain world!',
      html: 'Hello HTML world!',
      templateId: 'd-f43daeeaef504760851f727007e0b5d0',
      dynamic_template_data: {
        subject: 'Testing Templates',
        name: 'Some One',
        city: 'Denver',
      },
      mail_settings: {
        sandbox_mode: {
          enable: true
        }
      },
    };
    sgMail.send(msg);
  });
});
