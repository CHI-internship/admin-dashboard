export function passwordValidation(password) {
    const passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    return passwordFormat.test(password);
}
