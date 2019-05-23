'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    var Products = sequelize.define('Products',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            // attributes
            title: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            description:{
                type: DataTypes.TEXT
            },
            company:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull:false,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull:false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: 'products',
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            defaultScope: {}
        }
    );

    Products.associate = function(models){
        Products.hasMany(models.Ratings, {
            sourceId:'product_id'
        });

        Products.addScope('defaultScope',{
            include:[{
                model:models.Ratings
            }]
        })
    }


    return Products;
};