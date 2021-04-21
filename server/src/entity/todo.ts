import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Todo{
  @Field(type => ID)
  id: string = "";

  @Field()
  desc: string = "";

  @Field()
  completed: boolean = false;
}

