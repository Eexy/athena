import { Todo } from "../entity/todo";
import { Todo as TModel } from "../models/todo";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
  Args,
} from "type-graphql";
import { auth } from "../middlewares/auth";
import { Context } from "../utils/types";
import mongoose from "mongoose";
import { FindTodoArgs } from "../arguments/find-todos-args";

@Resolver(Todo)
export class TodoResolver {
  @UseMiddleware(auth)
  @Query((_) => Todo, { nullable: true })
  async todo(@Arg("id") id: string): Promise<Todo | null> {
    const todo = await TModel.findById(id);

    if (!todo) {
      return null;
    }

    return todo;
  }

  @UseMiddleware(auth)
  @Query((_) => [Todo])
  async todos(
    @Ctx() { userId }: Context,
    @Args() filters: FindTodoArgs
  ): Promise<Todo[]> {
    const cond: any = { owner: userId };
    const options: any = {};

    if (filters.completed) {
      cond.completed = filters.completed;
    }

    if (filters.limit) {
      options.limit = filters.limit;
    }

    if (filters.skip) {
      options.skip = filters.skip;
    }

    const todos = await TModel.find(cond, null, options);

    return todos;
  }

  @UseMiddleware(auth)
  @Mutation((_) => Todo)
  async createTodo(
    @Arg("desc") desc: string,
    @Ctx() { userId }: Context
  ): Promise<Todo> {
    const owner = mongoose.Types.ObjectId(userId);
    const todo = new TModel({ desc, owner });
    await todo.save();

    return todo;
  }

  @UseMiddleware(auth)
  @Mutation((_) => Boolean)
  async deleteTodo(@Arg("id") id: string): Promise<Boolean> {
    await TModel.findByIdAndDelete(id);

    return true;
  }

  @UseMiddleware(auth)
  @Mutation((_) => Todo)
  async updateTodoStatus(
    @Arg("id") id: string,
    @Arg("completed") completed: boolean
  ): Promise<Todo> {
    const todo = await TModel.findById(id);

    if (!todo) {
      throw new Error("Unable to find todo to update");
    }

    try {
      todo.completed = completed;
      await todo.save();
    } catch (e) {
      throw new Error("Unable to update todo");
    }

    return todo;
  }
}
