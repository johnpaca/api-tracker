export class Api {
    _id?: string;
    hostName: string;
    headers: Array<Header>; 
    path: string;
    method: string;
    data: string;
}

export class Header {
    key: string;
    value: string;
}
  