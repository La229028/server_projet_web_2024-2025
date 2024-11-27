import {PrimaryGeneratedColumn, Column, Entity, ManyToMany} from "typeorm";
import {UserEntity} from "./UserEntity";
import {FilmEntity} from "./FilmEntity";

@Entity()
export class ProviderEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    logoUrl!: string

    @ManyToMany(() => UserEntity, (user) => user.selectedProviders)
    selectedByUsers!: UserEntity[];



}