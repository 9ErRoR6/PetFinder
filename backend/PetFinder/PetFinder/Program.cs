using CloudinaryDotNet;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PetFinder;
using PetFinder.AutoMapper;
using PetFinder.DbInitializers;
using PetFinder.Entities;
using PetFinder.Entities.User;
using PetFinder.Interfaces;
using PetFinder.Repository;
using PetFinder.Services;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add Jwt
var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtConfig:Secret"]);
var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = true,
    //RequireExpirationTime = true,
    ClockSkew = TimeSpan.Zero,
    ValidIssuer = builder.Configuration["JwtConfig:Issuer"],
    ValidAudience = builder.Configuration["JwtConfig:Audience"],
};
//Add services
builder.Services.AddTransient<AdService>();
builder.Services.AddTransient<ServiceResponse>();
builder.Services.AddTransient<AnimalTypeService>();
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<JwtService>();


// Add Template repository
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddSingleton(tokenValidationParameters);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(jwt =>
{
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = tokenValidationParameters;
    jwt.RequireHttpsMetadata = false;
});
builder.Services.AddControllers();
builder.Services.AddDbContext<DbAppContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.Configure<CloudinarySettings>(
    builder.Configuration.GetSection("CloudinarySettings"));

builder.Services.AddSingleton(cloudinary =>
{
    var config = builder.Configuration.GetSection("CloudinarySettings").Get<CloudinarySettings>();
    var acc = new Account(config.CloudName, config.ApiKey, config.ApiSecret);
    return new CloudinaryDotNet.Cloudinary(acc);
});

//builder.Services.AddDbContext<DbAppContext>(options =>
//options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Dashboard API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement { {
        new OpenApiSecurityScheme
            {
         Reference = new OpenApiReference
         {
         Type=ReferenceType.SecurityScheme,
         Id="Bearer"
         }
         },
         new string[]{}
         }
         });
        }); ;
builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Password.RequireDigit = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = true;
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<DbAppContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAutoMapper(typeof(AutoMapperUserProfile));
builder.Services.AddAutoMapper(typeof(AutoMapperAnimalTypeProfile));
builder.Services.AddAutoMapper(typeof(AutoMapperAdProfile));

var app = builder.Build();
app.UseCors(options =>
    options.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.SeedData();
app.MapControllers();

app.Run();
