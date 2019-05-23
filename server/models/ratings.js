'use strict';
module.exports = (sequelize, DataTypes) => {
    var Ratings = sequelize.define('Ratings',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            description:{
                type: DataTypes.TEXT
            },
            title:{
                type: DataTypes.TEXT,
                allowNull:false,
                validate:{
                    notEmpty:true
                }
            },
            user_email:{
                type: DataTypes.TEXT,
                allowNull:false,
                validate:{
                    isEmail:true
                }
            },
            star:{
                type: DataTypes.ENUM(0,1,2,3,4,5),
                allowNull:false,
                defaultValue:0
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
            tableName: 'ratings',
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    Ratings.associate=function(models) {
        Ratings.belongsTo(models.Products, {
            foreignKey:'product_id'
        });
    }

    return Ratings;
};