import FileSystem from 'fs';

const writeJsonFile = (jsonObject: object, path: string, prettyPrint: boolean = true) => {
    const jsonAsString = prettyPrint
        ? JSON.stringify(jsonObject, null, 2)
        : JSON.stringify(jsonObject)

    FileSystem.writeFile(path, jsonAsString, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

export { writeJsonFile };
