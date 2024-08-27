using System;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;

namespace TodoServer
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController:  ControllerBase
    {
        public  AuthController()
        {

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
    }
}