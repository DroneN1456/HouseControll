export class CreateExpenseDTO{
    Value: number;
    Title?: string;
    Type: string;

    constructor(Value: number, Type: string, Title?: string){
        this.Value = Value;
        this.Type = Type;
        this.Title = Title;
    }
}