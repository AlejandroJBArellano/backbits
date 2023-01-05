import { diacriticSensitiveRegex } from "./diacriticSensitiveRegex"

export const createQueriesObject = (queries: { [key: string]: string; }, availableQueries: string[]) => {
    const query: any = {}
    Object.keys(queries).forEach((key) => {
        if (!(availableQueries.includes(key))) return 
        const value: string = queries[key] as string;
        if(value.length > 0){
            const newString = diacriticSensitiveRegex(value)
            const regexp = new RegExp(newString,'i');
            console.log(regexp)
            query[key] = regexp
        }
    })
    return query
}

