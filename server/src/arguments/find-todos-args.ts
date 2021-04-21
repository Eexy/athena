import { IsBoolean, IsInt, Min } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class FindTodoArgs {
  @Field((_) => Number, { nullable: true })
  @IsInt()
  @Min(0)
  limit?: number;

  @Field((_) => Number, { nullable: true })
  @IsInt()
  @Min(0)
  skip?: number;

  @Field((_) => Boolean, { nullable: true })
  @IsBoolean()
  completed?: Boolean;
}
