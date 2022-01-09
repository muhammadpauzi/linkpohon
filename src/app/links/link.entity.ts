import { IsNotEmpty, MaxLength, MinLength, validate, } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { buildErrorValidation } from "../../helpers/validator.helper";

@Entity({ name: 'links' })
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

    @MaxLength(500)
    @Column({
        type: "varchar",
        nullable: false,
        length: 500,
        default: ""
    })
    description!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

export const validateLink = async (body: any): Promise<boolean | object> => {
    let link = new Link();
    link.title = body.title;
    link.description = body.description;
    const errors = await validate(link);
    return errors.length > 0 ? buildErrorValidation(errors) : true;
}