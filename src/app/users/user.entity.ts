import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

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

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}