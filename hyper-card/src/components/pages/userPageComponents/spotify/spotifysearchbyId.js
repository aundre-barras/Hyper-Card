import { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "./spotify-config";

export const SearchArtistId = (artistId, setArtistsToDisplay) => {

    let artist = [];
    const [accessToken, setAccessToken] = useState("");

    const searchId = async () => {
        try {
            const searchParams = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                }
            }

            await fetch(
                "https://api.spotify.com/v1/artists/" + artistId, searchParams
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.name) {

                        artist = data;
                        setArtistsToDisplay(artist);

                    }
                });
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        // api access token
        try {
            var authParams = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body:
                    "grant_type=client_credentials&client_id=" +
                    CLIENT_ID +
                    "&client_secret=" +
                    CLIENT_SECRET_ID,
            };
            fetch("https://accounts.spotify.com/api/token", authParams)
                .then((result) => result.json())
                .then((data) => {
                    setAccessToken(data.access_token);
                });
        }

        catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            searchId();
        }
    }, [accessToken]);
};

export const SearchAlbumId = (albumId, setAlbumToDisplay) => {

    let album = [];
    const [accessToken, setAccessToken] = useState("");

    const searchId = async () => {
        try {
            const searchParams = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                }
            }

            await fetch(
                "https://api.spotify.com/v1/albums/" + albumId, searchParams
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.name) {

                        album = data;
                        setAlbumToDisplay(album);

                    }
                });
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        // api access token
        try {
            var authParams = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body:
                    "grant_type=client_credentials&client_id=" +
                    CLIENT_ID +
                    "&client_secret=" +
                    CLIENT_SECRET_ID,
            };
            fetch("https://accounts.spotify.com/api/token", authParams)
                .then((result) => result.json())
                .then((data) => {
                    setAccessToken(data.access_token);
                });
        }

        catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            searchId();
        }
    }, [accessToken]);
};

export const SearchPlaylistId = (playlistId, setPlaylistToDisplay) => {

    let playlist = [];
    const [accessToken, setAccessToken] = useState("");

    const searchId = async () => {
        try {
            const searchParams = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                }
            }

            await fetch(
                "https://api.spotify.com/v1/playlists/" + playlistId, searchParams
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.name) {
                        playlist = data;
                        setPlaylistToDisplay(playlist);

                    }
                });
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        // api access token
        try {
            var authParams = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body:
                    "grant_type=client_credentials&client_id=" +
                    CLIENT_ID +
                    "&client_secret=" +
                    CLIENT_SECRET_ID,
            };
            fetch("https://accounts.spotify.com/api/token", authParams)
                .then((result) => result.json())
                .then((data) => {
                    setAccessToken(data.access_token);
                });
        }

        catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            searchId();
        }
    }, [accessToken]);
};

export const SearchTrackId = (trackId, setTrackToDisplay) => {

    let track = [];
    const [accessToken, setAccessToken] = useState("");

    const searchId = async () => {
        try {
            const searchParams = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                }
            }

            await fetch(
                "https://api.spotify.com/v1/tracks/" + trackId, searchParams
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.name) {

                        track = data;

                        setTrackToDisplay(track);

                    }
                });
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        // api access token
        try {
            var authParams = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body:
                    "grant_type=client_credentials&client_id=" +
                    CLIENT_ID +
                    "&client_secret=" +
                    CLIENT_SECRET_ID,
            };
            fetch("https://accounts.spotify.com/api/token", authParams)
                .then((result) => result.json())
                .then((data) => {
                    setAccessToken(data.access_token);
                });
        }

        catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            searchId();
        }
    }, [accessToken]);
};

export const SearchPodcastId = (podcastId, setPodcastToDisplay) => {

    let podcast = [];
    const [accessToken, setAccessToken] = useState("");

    const searchId = async () => {
        try {
            const searchParams = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                }
            }

            await fetch(
                "https://api.spotify.com/v1/shows/" + podcastId + "?market=US", searchParams
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.name) {

                        podcast = data;

                        setPodcastToDisplay(podcast);

                    }
                });
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        // api access token
        try {
            var authParams = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body:
                    "grant_type=client_credentials&client_id=" +
                    CLIENT_ID +
                    "&client_secret=" +
                    CLIENT_SECRET_ID,
            };
            fetch("https://accounts.spotify.com/api/token", authParams)
                .then((result) => result.json())
                .then((data) => {
                    setAccessToken(data.access_token);
                });
        }

        catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            searchId();
        }
    }, [accessToken]);
};

export const SearchAudioBookId = (audioBookId, setAudioBookToDisplay) => {

    let book = [];
    const [accessToken, setAccessToken] = useState("");

    const searchId = async () => {
        try {
            const searchParams = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                }
            }

            await fetch(
                "https://api.spotify.com/v1/audiobooks/" + audioBookId, searchParams
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.name) {

                        book = data;

                        setAudioBookToDisplay(book);

                    }
                });
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        // api access token
        try {
            var authParams = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body:
                    "grant_type=client_credentials&client_id=" +
                    CLIENT_ID +
                    "&client_secret=" +
                    CLIENT_SECRET_ID,
            };
            fetch("https://accounts.spotify.com/api/token", authParams)
                .then((result) => result.json())
                .then((data) => {
                    setAccessToken(data.access_token);
                });
        }

        catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            searchId();
        }
    }, [accessToken]);
};