using System;

namespace todoserver.Service.ViewModel;

public class ServiceResponse<T>
{
    public bool ValidationStatus {get;set;}
    public string? Message {get; set;}
    public T? Data {get;set;}
}
