
// pattern --> defining a reg
function checkForURL(inputURL) {
    let pattern = inputURL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    if (pattern != null) {
        return 1;
    } else {
        return 0;
    }
}

export { checkForURL }