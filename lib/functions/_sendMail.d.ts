import { MailOptionsInterface } from "../types";
import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
export declare const _sendMail: (mail: MailOptionsInterface, transporter: Transporter<SMTPTransport.SentMessageInfo>) => Promise<unknown>;
