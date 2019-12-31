const team = (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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
        tableName: 'teams'
    })

    Team.associate = models => {
        Team.hasMany(models.User, {
            foreignKey: 'team_id'
        })
    }

    return Team
}

export default team
