import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type InputObject = {
    [key: string]: number | string | null;
};

type TransformedObject = {
    [key: string]: number | string;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toInt(value: string | number) {
    return parseInt(value.toString(), 10);
}

export function transformObject(inputObject: InputObject): TransformedObject {
    const transformedObject: TransformedObject = {};

    for (const key in inputObject) {
        const value = inputObject[key];

        if (value === null) {
            transformedObject[key] = '';
        } else if (typeof value === 'number' && value === null) {
            transformedObject[key] = 0;
        } else if (typeof value === 'string' && value === null) {
            transformedObject[key] = '';
        } else {
            transformedObject[key] = value;
        }
    }

    return transformedObject;
}
