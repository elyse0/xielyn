import { Ok, Err, Result } from 'ts-results-es'

import axios from 'axios'

interface HttpConfig {
    headers?: Record<string, string>
}

interface HttpError {
    status: number;
    body: unknown;
}

class HttpService {

    public static async get<T>(url: string, config: HttpConfig = {}): Promise<Result<T, HttpError>> {
        try {
            // @ts-ignore
            const response = await axios.get<T>(url, config);
            if (!response.data) {
                return Err({
                    status: response.status,
                    body: response.data,
                });
            }

            return Ok(response.data);
        } catch (e: any) {
            console.log(e.response.status);
            console.log(e.response.data);

            return Err({
                status: e.response.status,
                body: e.response.data,
            });
        }
    }

    public static async post<T>(url: string, data: any, config: HttpConfig = {}): Promise<Result<T, HttpError>> {
        try {
            // @ts-ignore
            const response = await axios.post<T>(url, data, config);
            if (!response.data) {
                return Err({
                    status: response.status,
                    body: response.data,
                });
            }

            return Ok(response.data);
        } catch (e: any) {
            console.log(e.response.status);
            console.log(e.response.data);

            return Err({
                status: e.response.status,
                body: e.response.data,
            });
        }
    }
}

export { HttpService, HttpConfig, HttpError }
