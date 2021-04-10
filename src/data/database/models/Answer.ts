import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '.';
import User from './User';
import Question from './Question';

export interface AnswerAttributes {
  id?: number;
  questionId: number;
  userId: number | undefined;
  body: string;
  accepted?: boolean;
  votes?: number;
}

type AnswerCreationAttributes = Optional<AnswerAttributes, 'id'>;

interface AnswerInstance
  extends Model<AnswerAttributes, AnswerCreationAttributes>,
    AnswerAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// model definition
const Answer = sequelize.define<AnswerInstance>('Answer', {
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  questionId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  body: {
    allowNull: false,
    type: DataTypes.STRING
  },
  accepted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  votes: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// associations
User.hasMany(Answer, {
  foreignKey: 'userId'
});
Answer.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Question.hasMany(Answer, {
  foreignKey: 'questionId'
});
Answer.belongsTo(Question, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default Answer;
