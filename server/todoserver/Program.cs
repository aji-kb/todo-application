using Microsoft.EntityFrameworkCore;
using todoserver.Data;
using todoserver.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
var connectionString = builder.Configuration.GetConnectionString("TaskDb");
builder.Services.AddDbContext<TaskDbContext>(options=>options.UseSqlServer(connectionString));

builder.Services.AddScoped<ITaskService, TaskService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddAuthentication(x=>{
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie(IdentityConstants.ExternalScheme, o =>
{
    o.Cookie.Name = IdentityConstants.ExternalScheme;
    o.ExpireTimeSpan = TimeSpan.FromMinutes(5);
})
.AddJwtBearer(x=>{
    x.Authority = "https://accounts.google.com/.well-known/openid-configuration";
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters{
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer="https://accounts.google.com"
    };
    x.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>  
        {

            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
            {
                context.Response.Headers.Append("Token-Expired", "true");
            }
            
            return Task.CompletedTask;
        }
    };    
})
.AddGoogle(options=>{
    var googleConfiguration = builder.Configuration.GetSection("Authentication:Google");

    options.ClientId = googleConfiguration["ClientId"]??"";
    options.ClientSecret = googleConfiguration["ClientSecret"]??"";

    options.Scope.Add("profile");
    options.SignInScheme =  Microsoft.AspNetCore.Identity.IdentityConstants.ExternalScheme;
    //options.SignInScheme =  CookieAuthenticationDefaults.AuthenticationScheme;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options=>{
    options.AllowAnyHeader();
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
});

app.UseAuthentication();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
