import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from "sequelize-typescript";
import Employe from "./Employe";

@Table({})
export default class leaveRequest extends Model {
  
  @ForeignKey(() => Employe)
  
  @Column
  employeeId!: number;

  @BelongsTo(() => Employe)
  employee!: Employe;

  @Column(DataType.DATE)
  startDate!: Date;

  @Column(DataType.DATE)
  endDate!: Date;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  status!: 'pending' | 'approved' | 'rejected';
}
