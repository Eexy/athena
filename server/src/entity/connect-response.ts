import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ConnectResponse {
  @Field()
  ok: boolean = false;

  @Field({ nullable: true })
  error?: string = "";
}
