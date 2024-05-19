export const fetcher = (...args) => fetch(...args).then(res => res.json());

export const HOST = "http://localhost:3000";