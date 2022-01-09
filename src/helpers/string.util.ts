const Crypto = require('crypto');

export const upperCaseFirstLetterOfSentence = (string: string): string => {
    return string[0].toUpperCase() + string.substr(1, string.length);
}