export type SelectOption = {
    label: string;
    value: any;
};

export type SelectOptions = SelectOption[];

export interface BaseResponse<T> {
    status: 'success' | 'error';
    message: string;
    statusCode: number;
    data: T;
}
