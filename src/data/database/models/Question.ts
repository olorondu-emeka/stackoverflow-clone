import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '.';
import User from './User';

export interface QuestionAttributes {
  id?: number;
  userId: number | undefined;
  title: string;
  body: string;
  slug: string;
  votes?: number;
}

type QuestionCreationAttributes = Optional<QuestionAttributes, 'id'>;

interface QuestionInstance
  extends Model<QuestionAttributes, QuestionCreationAttributes>,
    QuestionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// model definition
const Question = sequelize.define<QuestionInstance>('Question', {
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  body: {
    allowNull: false,
    type: DataTypes.STRING
  },
  slug: {
    allowNull: false,
    type: DataTypes.STRING
  },
  votes: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// associations
User.hasMany(Question, {
  foreignKey: 'userId'
});
Question.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default Question;
