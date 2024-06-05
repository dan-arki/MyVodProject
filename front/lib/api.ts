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
    getMedia :(id) => request(`/media/${id}`),

    //Watchlist
    checkWatchlist : (id) => request(`/watchlist/${id}`),
    addToWatchlist : (id) => request(`/watchlist`, { method: 'POST',body : JSON.stringify({mediaId:id})}),
    removeFromWatchlist : (id) => request(`/watchlist/${id}`, { method: 'DELETE' }),
    getWatchlist : () => request(`/watchlist`),

    //Watchings
    checkAlreadyViewed : (id) => request(`/watching/${id}`),
    addToAlreadyViewed : (id) => request(`/watching`, { method: 'POST',body : JSON.stringify({mediaId:id})}),
    removeFromAlreadyViewed : (id) => request(`/watching/${id}`, { method: 'DELETE' }),
};