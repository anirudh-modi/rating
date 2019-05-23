'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
		  Add altering commands here.
		  Return a promise to correctly handle asynchronicity.
	
		  Example:
		  return queryInterface.createTable('users', { id: Sequelize.INTEGER });
		*/
		var sequelize = queryInterface.sequelize;

		return sequelize.transaction(t => {
			var options = {
				transaction: t
			};

			return queryInterface
				.createTable("products",
					{
						id: {
							type: Sequelize.INTEGER,
							primaryKey: true,
							autoIncrement: true
						},
						// attributes
						title: {
							type: Sequelize.TEXT,
							allowNull: false
						},
						description: {
							type: Sequelize.TEXT
						},
						company: {
							type: Sequelize.TEXT,
							allowNull: false
						},
						created_at: {
							type: Sequelize.DATE,
							allowNull: false,
							defaultValue: Sequelize.NOW
						},
						updated_at: {
							type: Sequelize.DATE,
							allowNull: false,
							defaultValue: Sequelize.NOW
						}
					}, options)
				.then(() => {
					return queryInterface
						.bulkInsert('products', [{
							title: 'Black sneakers',
							description: 'A black rugged puma shoes',
							company: 'PUMA',
							created_at: 'NOW()',
							updated_at: 'NOW()'
						}, {
							title: 'Blue sneakers',
							description: 'A blue walking addidas shoes',
							company: 'ADDIDAS',
							created_at: 'NOW()',
							updated_at: 'NOW()'
						}, {
							title: 'Colgate Charcoal',
							description: 'A charcoal based toothpaste',
							company: 'Colgate',
							created_at: 'NOW()',
							updated_at: 'NOW()'
						}, {
							title: 'One plus 7 pro',
							description: 'A blazing fast flagship killer',
							company: 'OnePlus',
							created_at: 'NOW()',
							updated_at: 'NOW()'
						}], options);
				})
		});
	},

	down: (queryInterface, Sequelize) => {
		/*
		  Add reverting commands here.
		  Return a promise to correctly handle asynchronicity.
	
		  Example:
		  return queryInterface.dropTable('users');
		*/
		return queryInterface.dropTable('products');
	}
};