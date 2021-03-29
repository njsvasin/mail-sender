import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

const transport = nodemailer.createTransport({
  host: config.get('email:host'),
  port: config.get('email:port'),
  secure: config.get('email:secure'),
  auth: {
    type: config.get('email:auth:type'),
    user: config.get('email:auth:user'),
    pass: config.get('email:auth:pass'),
  },
  tls: {
    rejectUnauthorized: false
  }
});

const mailOptions = {
  from: config.get('email:from'),
  to: config.get('email:to'),
  subject: config.get('email:subject'),
  text: 'empty',
  html: '<b>empty</b>',
};

export const email = {
  defaults: mailOptions,
  send: options => new Promise((resolve, reject) => {
    transport.sendMail(options, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  }),
};
