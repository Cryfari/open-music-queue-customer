/**
 * listener
 */
class Listener {
  /**
   * @param {service} PlaylistsService
   * @param {service} mailSender
   */
  constructor(PlaylistsService, mailSender) {
    this._playlistsService = PlaylistsService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  /**
   * @param {string} message
   */
  async listen(message) {
    try {
      const {playlistId, targetEmail} = JSON.parse(message.content.toString());
      const playlist = await this._playlistsService.getPlaylists(playlistId);
      const result = await this._mailSender.sendEmail(
          targetEmail,
          JSON.stringify(playlist),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
