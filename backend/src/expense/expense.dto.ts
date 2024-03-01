export class CreateExpenseDTO{
    UserId: string;
    Value: number;
    Title?: string;
    Type: string;

    constructor(UserId: string, Value: number, Type: string, Title?: string){
        this.UserId = UserId;
        this.Value = Value;
        this.Type = Type;
        this.Title = Title;
    }
}