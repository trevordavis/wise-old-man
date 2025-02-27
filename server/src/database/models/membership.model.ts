import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { GROUP_ROLES } from '../../api/constants';
import { Group, Player } from '../../database/models';

// Define other table options
const options = {
  modelName: 'memberships',
  validate: {
     validateRole
  },
  indexes: [
    {
      unique: true,
      fields: ['playerId', 'groupId']
    }
  ]
};

@Table(options)
export default class Membership extends Model<Membership> {
  @ForeignKey(() => Player)
  @Column({ type: DataType.INTEGER, primaryKey: true, onDelete: 'CASCADE' })
  playerId: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, primaryKey: true, onDelete: 'CASCADE' })
  groupId: number;

  @Default('member')
  @Column({ type: DataType.STRING(40), allowNull: false })
  role: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  /* Associations */

  @BelongsTo(() => Player)
  player: Player;

  @BelongsTo(() => Group)
  group: Group;
}

function validateRole(this: Membership) {
  if (!GROUP_ROLES.includes(this.role)) {
    throw new Error(`Invalid role "${this.role}".`);
  }
}
