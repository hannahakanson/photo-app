/**
 * Photo model
 */

 module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		users() {
			return this.belongsTo('User');
		},
		albums() {
			return this.belongsToMany('Album', 'photos_albums', 'photo_id', 'album_id');
		}
	});
};
