import { Model, Optional } from 'sequelize';
import User from './User';
import { sequelize } from '.';

interface SessionAttributes {
	id: number;
	userId: number;
	token: string;
	active: boolean;
}

type SessionCreationAttributes = Optional<SessionAttributes, 'id'>;

interface SessionInstance extends Model<SessionAttributes, SessionCreationAttributes>, SessionAttributes {
	createdAt?: Date;
	updatedAt?: Date;
}

// model definition
const Session = sequelize.define<SessionInstance>('Session', {
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  token: {
    allowNull: false,
    type: DataTypes.STRING
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

Session.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
