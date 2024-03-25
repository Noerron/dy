import http from "./http";

export const BloggerInfoApi = (params) => http.post("/api/bloggerinfo", params);
