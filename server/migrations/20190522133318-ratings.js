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
				transaction:t
			};

			return queryInterface
				.createTable("ratings", 
				{
					id: {
						type: Sequelize.INTEGER,
						primaryKey: true,
						autoIncrement: true
					},
					description:{
						type: Sequelize.TEXT
					},
					product_id:{
						type: Sequelize.INTEGER,
						allowNull:false,
						references: {
							model: 'products',
							key: 'id'
						}
					},
					user_email:{
						type: Sequelize.TEXT,
						allowNull:false
					},
					star:{
						type: Sequelize.ENUM('0','1','2','3','4','5'),
						allowNull:false,
						defaultValue:'0'
					},
					title:{
						type: Sequelize.TEXT,
						allowNull:false
					},
					created_at: {
						type: Sequelize.DATE,
						allowNull:false,
						defaultValue: Sequelize.NOW
					},
					updated_at: {
						type: Sequelize.DATE,
						allowNull:false,
						defaultValue: Sequelize.NOW
					}
				},options)
				.then(() => {
					return sequelize
						.query(`CREATE UNIQUE INDEX rating_user_product 
							ON ratings (product_id,user_email);`,options);
				})
				.then(()=>{
					return queryInterface
						.bulkInsert('ratings', [{
							description: 'They are insanely comfortable bro! Dope!',
							product_id:1,
							user_email:'anirudh@abc.com',
							title:'Insane',
							star:'5',
							created_at:'NOW()',
							updated_at:'NOW()'
						},{
							description: 'They are insanely filthy costly bro!',
							product_id:1,
							user_email:'anirudh@bbc.com',
							star:'2',
							title:'Not worth it',
							created_at:'NOW()',
							updated_at:'NOW()'
						},{
							description: 'They are insanely extremely good looking! Fairly confortable',
							product_id:1,
							user_email:'anirudh@ccc.com',
							created_at:'NOW()',
							title:'Fair',
							star:'3',
							updated_at:'NOW()'
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
		return queryInterface.dropTable('ratings');
	}
};