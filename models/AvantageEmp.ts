import{Table ,Column,Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import Employe from "./Employe";



@Table({})
export default class AvantageEmp extends Model {
  @ForeignKey(() => Employe)
   @Column
 employeeId!: number;

  @BelongsTo(() => Employe)
  employee!: Employe;
  
  @Column
  assuranceSante!: string;

  @Column
  retraite!: string;

  @Column
  evenement!: string;

  @Column
  jourferie!: string;

  // Autres champs d'informations sur les avantages sociaux
}