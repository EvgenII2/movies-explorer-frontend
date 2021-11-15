import { REGEX_CURILLIC_AND_LATIN, REGEX_EMAIL } from "./constants"

function checkValidName(name) {
    return name.length > 0 &&
        name.match(REGEX_CURILLIC_AND_LATIN);
}
function checkValidEmail(email) {
    return email.length > 0 &&
        email.match(REGEX_EMAIL);
}
function checkValidPassword(password) {
    return password.length > 3 &&
        password.length < 201;
}

export { checkValidName, checkValidEmail, checkValidPassword };