using System;
using Google.Apis.Auth.OAuth2.Responses;
using todoserver.Service.ViewModel;

namespace todoserver.Service.Contract;

public interface IAuthService
{
    public ServiceResponse<bool> ValidateUser(string userEmail);

    public ServiceResponse<int> CreateUser(UserViewModel userViewModel);
}
