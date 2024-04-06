import type SMTPTransport from 'nodemailer/lib/smtp-transport'

import nodemailer from 'nodemailer'


// NOTE: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35847#issuecomment-638091133
export function createTransporter(user: string, pass: string) {
  return nodemailer.createTransport({
    auth: {
      pass,
      user,
    },
    service: 'Gmail',
  } as SMTPTransport.Options)
}
