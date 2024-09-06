using System;

namespace todoserver.Data.Model;

public class User : TrackedEntity
{
    public int Id {get;set;}
    public string? UserEmail {get;set;}
    public string? Name {get;set;}

}
