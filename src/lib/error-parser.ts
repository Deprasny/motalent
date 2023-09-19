export const parseArrayErrorMessage = (errors: any[]) => {
    let message = '';
    errors.forEach((err) => {
        message += `${err} \n`;
    });
    return message;
};
