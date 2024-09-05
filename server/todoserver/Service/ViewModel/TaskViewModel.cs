using System;

namespace todoserver.Service.ViewModel;

public class TaskViewModel
{
    public int Id {get;set;}
    public string? TaskName {get;set;}
    public bool IsCompleted {get;set;}
    public DateTime? DueDate {get;set;}
    public int? CategoryId {get;set;}
}
