using System;
using todoserver.Data;
using todoserver.Service.Contract;
using todoserver.Service.ViewModel;

namespace todoserver.Service;

public class AuthService : IAuthService
{
    private readonly TaskDbContext _taskDbContext;
    private readonly ILogger<AuthService> _logger;

    public AuthService(TaskDbContext taskDbContext, ILogger<AuthService> logger)
    {
        _taskDbContext = taskDbContext;
        _logger = logger;
    }

    public ServiceResponse<int> CreateUser(UserViewModel userViewModel)
    {
        var serviceResponse = new ServiceResponse<int>();

        //TODO: Validate the user information (non-empty, valid email)

        _taskDbContext.Users.Add(new Data.Model.User{
            UserEmail = userViewModel.UserEmail,
            Name = userViewModel.Name
        });

        var result = _taskDbContext.SaveChanges();

        serviceResponse.Data = result;

        return serviceResponse;
    }

    public ServiceResponse<bool> ValidateUser(string userEmail)
    {
        bool validationResponse = false;
        _logger.LogInformation("AuthService.ValidateUser for email {0}", userEmail);

        var serviceResponse = new ServiceResponse<bool>();

        var user = _taskDbContext.Users.FirstOrDefault(x=>x.UserEmail == userEmail);

        if(user != null)
            validationResponse = true;

        serviceResponse.Data = validationResponse;

        return serviceResponse;
    }
}
