using System;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using Newtonsoft.Json;
using todoserver.Service.ViewModel;
using todoserver.Service.Contract;

namespace TodoServer
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController:  ControllerBase
    {

        private IConfiguration _configuration;
        private readonly IAuthService _authService;

        public  AuthController(IConfiguration configuration, IAuthService authService)
        {
            _configuration = configuration;
            _authService = authService;
        }


        [HttpGet]
        [Route("google")]
        public async Task<IActionResult> GoogleAuthentication(string idToken)
        {
            GoogleJsonWebSignature.Payload data = await GoogleJsonWebSignature.ValidateAsync(idToken);
            if(data != null)
                return Ok(new {Email = data.Email, Name = data.Name});
            else
                return BadRequest("User cannot be validated with Google");
        }


        [HttpPost]
        [Route("google/token")]
        public async Task<IActionResult> GetGoogleAccessToken([FromBody] string code)
        {

            //TODO: move the entire logic to service layer
            var googleConfiguration = _configuration.GetSection("Authentication:Google");
            var client_id = googleConfiguration["ClientId"];
            var client_secret = googleConfiguration["ClientSecret"];
            var oAuthUrl = googleConfiguration["OAuthUrl"];
            var scopes = googleConfiguration["Scopes"];

            string postData = $"code={code}&client_id={client_id}&client_secret={client_secret}&redirect_uri=postmessage&grant_type=authorization_code&scope={Uri.EscapeDataString(scopes)}";
            var utf8Content = System.Text.Encoding.UTF8.GetBytes(postData);

            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.PostAsync(oAuthUrl, new StringContent(postData, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded"));
                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var googleAuthResponse = JsonConvert.DeserializeObject<GoogleAuthResponse>(responseContent);
                    if (googleAuthResponse != null)
                    {
                        GoogleJsonWebSignature.Payload payLoad = await GoogleJsonWebSignature.ValidateAsync(googleAuthResponse.IdToken);
                        if (!string.IsNullOrEmpty(payLoad.Email))
                        {
                            //Create the user in database if not already available. 
                            //TODO : Ask the user if they want new account to be created. For now creating without asking the user
                            // var validationResponse = _authService.ValidateUser(payLoad.Email);
                            // if(validationResponse.Data == false)
                            // {
                            //     //now create the user
                            //     //var createReponse = _authService.CreateUser(new UserViewModel{UserEmail = payLoad.Email});
                            //     //if(createReponse.Data == 0)
                            //     //    return StatusCode(500, "Error in creating account for the user");
                            // }
                            _configuration["useremail"] = payLoad.Email;
                            return Ok(new { Email = payLoad.Email, Name = payLoad.Name,IdToken = googleAuthResponse.IdToken,  AccessToken = googleAuthResponse.AccessToken, RefreshToken = googleAuthResponse.RefreshToken });
                        }
                        else
                            return StatusCode(500, "Error in Google Authentication");
                    }
                    else
                        return StatusCode(500, "Error in Google Authentication");
                }
                else
                    return StatusCode(500, "Error in Google Authentication");
            }
        }            
    }
}