export enum Status {
    Ok = 0
}

export class NewsResponse<T> {
    status: Status;
    data: T;
}