using System.ComponentModel.DataAnnotations;
using todoserver.Data.Contract;

namespace todoserver.Data.Model;

public class Category: TrackedEntity
{
    public int Id {get;set;}
    public string? CategoryName {get;set;}
    
}