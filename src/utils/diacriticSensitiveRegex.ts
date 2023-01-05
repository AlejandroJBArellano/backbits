export const diacriticSensitiveRegex = (string = "") => {
    let newRegexp = string 
    const regexpA = new RegExp("[aáàäâAÁÄÀÂ]","g")
    const regexpE = new RegExp("[eéëèêEÈÉÊË]","g")
    const regexpI = new RegExp("[iìíîïIÌÍÎÏ]","g")
    const regexpO = new RegExp("[oóöòôOÒÓÔÖ]","g")
    const regexpU = new RegExp("[uùúûüUÙÚÛÜ]","g")

    newRegexp = newRegexp.replace(regexpA, "[aáàäâAÁÄÀÂ]")
    newRegexp = newRegexp.replace(regexpE, "[eéëèêEÈÉÊË]")
    newRegexp = newRegexp.replace(regexpI, "[iìíîïIÌÍÎÏ]")
    newRegexp = newRegexp.replace(regexpO, "[oóöòôOÒÓÔÖ]")
    newRegexp = newRegexp.replace(regexpU, "[uùúûüUÙÚÛÜ]")

    return newRegexp
}