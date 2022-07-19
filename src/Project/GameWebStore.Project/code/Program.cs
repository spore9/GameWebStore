using GameWebStore.Feature.Account.Graph.Schemas;
using GameWebStore.Foundation.DatabaseFramework;
using GameWebStore.Foundation.DatabaseFramework.Models;
using GameWebStore.Foundation.Security.Models;
using GraphQL;
using GraphQL.Caching;
using GraphQL.MicrosoftDI;
using GraphQL.Server;
using GraphQL.SystemTextJson;
using GraphQL.Types;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddCors();

builder.Services.AddGraphQL(b => b
                .AddHttpMiddleware<ISchema>()
                .AddUserContextBuilder(httpContext => new GraphQLUserContext { User = httpContext.User })
                .AddAutomaticPersistedQueries()
                .AddSystemTextJson()
                .AddErrorInfoProvider(opt => opt.ExposeExceptionStackTrace = true)
                .AddSchema<AuthConfigurationSchema>()
                .AddGraphTypes(typeof(AuthConfigurationSchema).Assembly));

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(builder => builder.WithOrigins("https://localhost:44436")
                            .AllowAnyMethod()
                            .WithHeaders("accept", "content-type", "origin", "custom-header").AllowCredentials());

app.UseGraphQL<ISchema>();
app.UseGraphQLPlayground();
app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapGraphQL<ISchema>();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();
app.MapFallbackToFile("index.html"); ;

app.Run();
