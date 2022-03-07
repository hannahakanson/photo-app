/**
 * Album model
 */

 module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
        user() {
			return this.belongsTo('User');   
		},
        photos() {
			return this.belongsToMany('Photo', 'photos_albums', 'album_id', 'photo_id');
		}
	});
};