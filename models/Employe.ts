import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import CalendrierEmp from "./CalendrierEmp";
import Comment from "./Comments";

@Table({})
export default class Employe extends Model {
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column({ type: DataType.STRING, defaultValue: "nom" })
  nom!: string;

  @Column({ type: DataType.STRING, defaultValue: "prenom" })
  prenom!: string;

  @Column({ type: DataType.STRING, defaultValue: "poste" })
  poste!: string;

  @Column({ type: DataType.STRING, defaultValue: "adresse" })
  adresse!: string;

  @Column({ type: DataType.STRING, defaultValue: "departement" })
  departement!: string;

  @Column({ defaultValue: 8 })
  heureTravail!: number;

  @HasMany(() => CalendrierEmp, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
  })
  calendrier!: CalendrierEmp[];

  @Column({ type: DataType.STRING, defaultValue: "employe" })
  role!: "employe" | "rh";

  @HasMany(() => Comment)
  comments!: Comment[];
}
