const apiServiceUrl = import.meta.env.VITE_API_SERVICE_URL
if (typeof apiServiceUrl !== 'string') {
    throw Error("Env: VITE_API_SERVICE_URL is not set")
}

export default {
    apiServiceUrl
}
