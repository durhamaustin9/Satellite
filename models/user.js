module.exports = (database, DataTypes) => {
  const user = database.define('user', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get () {
        let fullName = this.getDataValue('firstName')

        if (this.getDataValue('firstName') !== null && this.getDataValue('lastName') !== null) {
          fullName = `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`
        }

        return fullName
      }
    },
    phoneNumber: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    verificationCode: {
      type: DataTypes.STRING(6)
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    createdAt: {
      type: 'DATETIME',
      defaultValue: database.Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'DATETIME',
      defaultValue: database.Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    deletedAt: {
      type: 'DATETIME'
    }
  }, {
    underscored: false,
    paranoid: true,
    timestamps: true
  })

  user.processSetup = () => {
    const processes = []

    processes.push(user.hasOne(database.models.role, {
      foreignKey: 'id',
      targetKey: 'roleId',
      as: 'role',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    }))

    return Promise.allSettled(processes)
  }

  return user
}
