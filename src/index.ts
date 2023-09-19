type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface IApiHelper {
  url: string;
  constructor(url: string): void;
  request<T>(method: Methods, endpoint: string, options?: Options): Promise<T>;

  get<T>(endpoint: string, options?: Options): Promise<T>;
  post<T>(endpoint: string, options?: Options): Promise<T>;
  put<T>(endpoint: string, options?: Options): Promise<T>;
  delete<T>(endpoint: string, options?: Options): Promise<T>;
  patch<T>(endpoint: string, options?: Options): Promise<T>;
}

interface Options {
  query?: Record<string, string>; // query must be added to endpoint like ?name=John&a=4&...
  headers?: Record<string, string>;
}

class ApiHelper {
  url: string;

  constructor(url: string) {
    this.url = url;
  }
  async request<T>(
    method: Methods,
    endpoint: string,
    options?: Options
  ): Promise<T> {
    const queries = Object.keys(options.query).map((key) => `${key}=${options.query[key]}`);
    const queryString = queries.join('&');
    const res = await fetch(`${this.url}${endpoint}?${queryString}`, {
      method,
      headers: options.headers,
    });

    const resJson = res.json();
    return resJson;
  }
  get<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request("GET", endpoint, options);
  }
  post<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request("POST", endpoint, options);
  }
  put<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request("PUT", endpoint, options);
  }
  delete<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request("DELETE", endpoint, options);
  }
  patch<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request("PATCH", endpoint, options);
  }
}

(async () => {
  const jsonplaceholder = new ApiHelper("https://jsonplaceholder.typicode.com");

  // const allPosts = await jsonplaceholder.request('POST', '/posts');
  const allPosts = await jsonplaceholder.get("/posts", {
    headers: {
      "x-api-key": "12",
    },
    query: { userId: "1" },
  });

  console.log(allPosts);

  const secondUserPosts = await jsonplaceholder.get('/posts', {
    query: {
      userId: "2"
    }
  })
})();
