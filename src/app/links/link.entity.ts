import { IsNotEmpty, IsUrl, MaxLength, MinLength, validate, } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { buildErrorValidation } from "../../helpers/validator.helper";
import User from "../users/user.entity";

@Entity({
    name: 'links'
})
export default class Link extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @MinLength(5)
    @IsNotEmpty()
    @Column({
        type: "varchar",
        length: 128,
        nullable: false
    })
    title!: string;

    @IsUrl()
    @IsNotEmpty()
    @Column({
        type: "varchar",
        length: 500,
        nullable: false
    })
    url!: string;

    @MaxLength(500)
    @Column({
        type: "varchar",
        nullable: false,
        length: 500,
        default: ""
    })
    description!: string;

    @Column()
    userId!: number;

    @ManyToOne(() => User, user => user.links, { onDelete: "CASCADE" })
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

export const validateLink = async (body: any): Promise<boolean | object> => {
    let link = new Link();
    link.title = body.title;
    link.description = body.description;
    link.url = body.url;
    const errors = await validate(link);
    return errors.length > 0 ? buildErrorValidation(errors) : true;
}