import { Model, Optional, DataTypes } from 'sequelize';
import Session from './Session';
import { sequelize } from '.';

export interface UserAttributes {
  id?: number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// model definition
const User = sequelize.define<UserInstance>('User', {
  firstName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  }
});

User.hasMany(Session, {
  foreignKey: 'userId'
});

export default User;
