import { postNoBody } from "./HTTPUserService";

export const preOrderedRequest = (url: string, model?: any) => {
    return postNoBody("PreOrder/" + url, model);
}

export const clickRequest = (url: string, product: any) => {
    return postNoBody("Click/" + url, product);
}
