import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import Link from "../links/link.entity";

@Entity({ name: 'users' })
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        length: 128,
        nullable: false
    })
    name!: string;

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
        nullable: false
    })
    google_id!: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    image!: string;

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
        nullable: false
    })
    email!: string;

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
        nullable: false
    })
    username!: string;

    @OneToMany(() => Link, link => link.user)
    links!: Link[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}