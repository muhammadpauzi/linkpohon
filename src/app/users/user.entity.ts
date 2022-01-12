import { IsNotEmpty, MaxLength, validate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { buildErrorValidation } from "../../helpers/validator.helper";
import Link from "../links/link.entity";

@Entity({ name: 'users' })
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({
        type: "varchar",
        length: 128,
        nullable: false
    })
    name!: string;

    @MaxLength(500)
    @Column({
        type: "varchar",
        length: 500,
        nullable: false,
        default: ""
    })
    description!: string;

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

export const validateUser = async (body: any): Promise<boolean | object> => {
    let user = new User();
    user.name = body.name;
    user.description = body.description;
    const errors = await validate(user);
    return errors.length > 0 ? buildErrorValidation(errors) : true;
}