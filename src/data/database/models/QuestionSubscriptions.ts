import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '.';
import User from './User';
import Question from './Question';

export interface QuestionSubscriptionAttributes {
  id?: number;
  userId: number;
  questionId: number;
}

type QuestionSubscriptionCreationAttributes = Optional<
  QuestionSubscriptionAttributes,
  'id'
>;

interface QuestionSubscriptionInstance
  extends Model<
      QuestionSubscriptionAttributes,
      QuestionSubscriptionCreationAttributes
    >,
    QuestionSubscriptionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// model definition
const QuestionSubscription = sequelize.define<QuestionSubscriptionInstance>(
  'QuestionSubscription',
  {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    questionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }
);

// associations
User.hasMany(QuestionSubscription, {
  foreignKey: 'userId'
});
QuestionSubscription.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Question.hasMany(QuestionSubscription, {
  foreignKey: 'questionId'
});
QuestionSubscription.belongsTo(Question, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

export default QuestionSubscription;
