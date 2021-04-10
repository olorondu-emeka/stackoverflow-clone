import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '.';
import User from './User';

export interface VoteAttributes {
  id?: number;
  userId: number | undefined;
  isValid?: boolean;
  votes?: number;
}

type VoteCreationAttributes = Optional<VoteAttributes, 'id'>;

interface VoteInstance
  extends Model<VoteAttributes, VoteCreationAttributes>,
    VoteAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// model definition
const Vote = sequelize.define<VoteInstance>('Vote', {
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  isValid: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  votes: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 5
  }
});

// associations
User.hasMany(Vote, {
  foreignKey: 'userId'
});
Vote.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default Vote;
