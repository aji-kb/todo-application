using System;

namespace todoserver.Data.Contract;

public interface ITrackedEntity
{
    public string? CreatedBy {get;set;}
    public DateTime CreatedDate {get;set;}   
    public string? ModifiedBy {get;set;}
    public DateTime? ModifiedDate {get;set;}
}
