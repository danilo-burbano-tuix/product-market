import { Entity, PrimaryKey, Property } from "@mikro-orm/core"

import { v4 } from 'uuid'

@Entity()
export class Product {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  name!: string

  @Property()
  price!: string

  @Property()
  size!: string
}