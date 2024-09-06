using System;
using System.ComponentModel.DataAnnotations;
using todoserver.Data.Contract;

namespace todoserver.Data.Model;

public class TaskCategory : TrackedEntity
{
    public int Id {get;set;}
    public int TaskId {get;set;}
    public int CategoryId {get;set;}
}
