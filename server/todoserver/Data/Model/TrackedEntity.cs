using System;
using todoserver.Data.Contract;

namespace todoserver.Data.Model;

public class TrackedEntity : ITrackedEntity
{
    public string? CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string? ModifiedBy { get ; set; }
    public DateTime? ModifiedDate { get; set; }
}
