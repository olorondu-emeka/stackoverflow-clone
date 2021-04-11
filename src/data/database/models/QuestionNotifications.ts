import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '.';
import Question from './Question';

export interface QuestionNotificationAttributes {
  id?: number;
  questionId: number;
  message: string;
}

type QuestionNotificationCreationAttributes = Optional<
  QuestionNotificationAttributes,
  'id'
>;

interface QuestionNotificationInstance
  extends Model<
      QuestionNotificationAttributes,
      QuestionNotificationCreationAttributes
    >,
    QuestionNotificationAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// model definition
const QuestionNotification = sequelize.define<QuestionNotificationInstance>(
  'QuestionNotification',
  {
    questionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }
);

// associations
Question.hasMany(QuestionNotification, {
  foreignKey: 'questionId'
});
QuestionNotification.belongsTo(Question, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default QuestionNotification;
