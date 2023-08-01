const {Pool} = require('pg');

/**
 * playlist service
 */
class PlaylistsService {
  /**
   * constructor
   */
  constructor() {
    this._pool = new Pool();
  }

  /**
   * @param {string} playlistId
   */
  async getPlaylists(playlistId) {
    const query = {
      text: `SELECT playlists.playlist_id, playlists.name,
              songs.song_id, songs.title, songs.performer 
              FROM playlists 
              LEFT JOIN playlist_songs 
              ON playlists.playlist_id = playlist_songs.playlist_id 
              LEFT JOIN songs 
              ON playlist_songs.song_id = songs.song_id 
              WHERE playlists.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return {
      playlist: {
        id: result.rows[0].playlist_id,
        name: result.rows[0].name,
        songs: result.rows[0]?.song_id ? result.rows.map((song) => ({
          id: song.song_id,
          title: song.title,
          performer: song.performer,
        })) : [],
      },
    };
  }
}

module.exports = PlaylistsService;
