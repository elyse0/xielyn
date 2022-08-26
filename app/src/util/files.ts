const getContentAsString = async (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = (event) => {
            if (!event.target) {
                resolve(null)
                return
            }
            resolve(event.target.result as string | null)
        };

        reader.onerror = () => {
            reject()
        }
    });
}

export { getContentAsString }
