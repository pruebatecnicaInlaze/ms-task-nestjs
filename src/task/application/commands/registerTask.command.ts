export class RegisterTaskCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly limitDate: Date,
    public readonly userId?: string,
    public readonly userName?: string,
  ) {}
}
