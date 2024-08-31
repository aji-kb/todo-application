namespace todoserver.Data.Model;

public class Task : TrackedEntity
{
    public int Id {get;set;}
    public string? TaskName {get;set;}
    public DateTime? DueDate {get;set;}
    public bool IsCompleted {get;set;}
    public TaskCategory? TaskCategory {get;set;}
}