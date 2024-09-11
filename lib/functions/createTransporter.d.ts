import * as nodemailer from "nodemailer";
import { NodeMailerOptionsInterface } from "../types";
export declare function createTransporter(nodemailerOption: NodeMailerOptionsInterface): nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
