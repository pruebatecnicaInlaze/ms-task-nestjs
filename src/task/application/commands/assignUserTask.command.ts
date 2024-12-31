export class AssignUserTaskCommand {
  constructor(
    public readonly taskId: string,
    public readonly emailUser: string,
  ) {}
}
