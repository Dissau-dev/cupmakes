export const translateOptions = (options: any) => {
    let list: Array<string> = [];

    const keys = Object.keys(options);
    keys.forEach(key => {
        list.push(`${key}=${options[key]}`);
    });

    return list.join("&");
};
