import axios from 'axios';

export async function fetch<T>(
    path: string
): Promise<T> {
    const { data } = await axios.get(path);
    return data;
};