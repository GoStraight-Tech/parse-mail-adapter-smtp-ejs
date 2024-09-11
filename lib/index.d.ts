import { AdapterOptionsInterface, MailOptionsInterface, ParseDataEmailInterface } from "./types";
declare let MailAdapter: (adapterOptions: AdapterOptionsInterface) => Readonly<{
    sendMail: (options: MailOptionsInterface) => Promise<unknown>;
    sendPasswordResetEmail: (data: ParseDataEmailInterface) => Promise<unknown>;
    sendVerificationEmail: (data: ParseDataEmailInterface) => Promise<unknown>;
}>;
export default MailAdapter;
