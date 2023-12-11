import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from "sequelize-typescript";
import Employe from "./Employe";

@Table({})
export default class Demission extends Model {
  @ForeignKey(() => Employe)
@Column
employeeId!: number;

@BelongsTo(() => Employe, { onDelete: 'CASCADE' })
employee!: Employe;

  @Column(DataType.DATE)
  submissionDate!: Date;

  @Column(DataType.STRING)
  reason!: string;

  @Column(DataType.ENUM('pending', 'approved', 'rejected'))
  status!: 'pending' | 'approved' | 'rejected';
}
