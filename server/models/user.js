const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        teamId: {
            type: DataTypes.INTEGER,
            field: 'team_id',
            /*allowNull: false,
            validate: {
                notNull: {
                    msg: 'teamId is cannot be null'
                },
            }*/
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'The same name already exists'
            },
            validate: {
                notEmpty: {
                    msg: 'name is cannot be empty'
                },
                len: [2, 20]
            }
        },
        createdAt: {type: DataTypes.DATE},
        updatedAt: {type: DataTypes.DATE},
    }, {
        tableName: 'users'
    })

    User.associate = models => {
        User.belongsTo(models.Team, {
            foreignKey: 'team_id'
        })
    }

    return User
}

export default user
