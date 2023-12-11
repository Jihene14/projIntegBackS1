import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Employe from "./Employe";


@Table
export default class CalendrierEmp extends Model {
  @Column
  jour!:Date; 
  @Column
  heureArriv!: Date;
  @Column
  heureDep!: Date;
  @Column({defaultValue: 0})
  heureSup!: number;
  @Column({defaultValue: 0})
  heureConge!: number;

  @ForeignKey(() => Employe)
  @Column
  employeId!: number;

  @BelongsTo(() => Employe,{ onDelete: 'CASCADE' })
  employe!: Employe;
}
