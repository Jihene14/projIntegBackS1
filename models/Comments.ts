import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from "sequelize-typescript";
import Employe from "./Employe";

@Table({})
export default class Comment extends Model {
  @ForeignKey(() => Employe)
  @Column
  employeeId!: number;

  @BelongsTo(() => Employe)
  employee!: Employe;

  @Column(DataType.TEXT)
  content!: string;

  @Column(DataType.DATE)
  date!: Date;
}
