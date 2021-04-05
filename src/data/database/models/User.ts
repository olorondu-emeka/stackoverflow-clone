import { Model, Optional } from 'sequelize';
import Session from './Session';
import { sequelize } from '.';

interface UserAttributes {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
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
