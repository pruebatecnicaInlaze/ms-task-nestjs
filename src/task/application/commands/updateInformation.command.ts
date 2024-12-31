export class UpdateInformationCommand {
  constructor(
    public readonly taskId: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly limitDate?: Date,
    public readonly statusTask?: string,
  ) {}
}
