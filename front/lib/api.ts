function request(path, options:any = {}) {
     return fetch(`http://localhost:3333${path
     }`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          ...options?.headers,
        },
      })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('API Error');
      }
    });
}

export const api = {
    // Auth

    getMedia :(id) => request(`/media/${id}`),
    checkWatchlist : (id) => request(`/watchlist/${id}`),
    addToWatchlist : (id) => request(`/watchlist`, { method: 'POST',body : JSON.stringify({mediaId:id})}),
    removeFromWatchlist : (id) => request(`/watchlist/${id}`, { method: 'DELETE' }),
};