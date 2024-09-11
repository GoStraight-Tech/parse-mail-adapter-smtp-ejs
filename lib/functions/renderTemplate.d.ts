import { AdapterOptionsInterface } from "../types";
export declare const renderTemplate: (template: string, data: {
    [key: string]: string;
} | undefined, locale: string | undefined, adapterOptions: AdapterOptionsInterface) => Promise<unknown>;
