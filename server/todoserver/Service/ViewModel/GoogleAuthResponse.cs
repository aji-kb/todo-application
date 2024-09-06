using System;
using Newtonsoft.Json;

namespace todoserver.Service.ViewModel;

public class GoogleAuthResponse
{
        [JsonProperty("access_token")]
        public string? AccessToken { get; set; }
        [JsonProperty("refresh_token")]
        public string? RefreshToken { get; set; }
        [JsonProperty("id_token")]
        public string? IdToken { get; set; }
}
