// API Client for handling authenticated requests
export class ApiClient {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
    this.token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
  }

  // Set or update the token
  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
  }

  // Get current token
  getToken(): string | null {
    return this.token;
  }

  // Generic request method
  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    // Add auth header if token exists
    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      };
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    return data;
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const data = await this.request<{ user: any; token: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );

    this.setToken(data.token);
    return data;
  }

  async register(
    email: string,
    password: string,
    name: string,
    phone?: string
  ) {
    const data = await this.request<{ user: any; token: string }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ email, password, name, phone }),
      }
    );

    this.setToken(data.token);
    return data;
  }

  async getProfile() {
    return this.request("/auth/me");
  }

  logout() {
    this.setToken(null);
  }

  // Car endpoints
  async getCars() {
    return this.request("/cars");
  }

  async getCar(id: string) {
    return this.request(`/cars/${id}`);
  }

  async searchCars(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/cars/search?${queryString}`);
  }

  // Rental endpoints
  async getRentals(params?: Record<string, any>) {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/rentals${queryString}`);
  }

  async createRental(data: any) {
    return this.request("/rentals", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getRental(id: string) {
    return this.request(`/rentals/${id}`);
  }

  // Favorites endpoints
  async getFavorites() {
    return this.request("/favorites");
  }

  async addFavorite(carId: string) {
    return this.request("/favorites", {
      method: "POST",
      body: JSON.stringify({ carId }),
    });
  }

  async removeFavorite(carId: string) {
    return this.request("/favorites", {
      method: "DELETE",
      body: JSON.stringify({ carId }),
    });
  }

  // Review endpoints
  async getReviews(carId?: string) {
    const query = carId ? `?carId=${carId}` : "";
    return this.request(`/reviews${query}`);
  }

  async createReview(carId: string, rating: number, comment: string) {
    return this.request("/reviews", {
      method: "POST",
      body: JSON.stringify({ carId, rating, comment }),
    });
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();
