
using BookStore.BusinessLogic.Services;
using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.DataAccess.Data;
using BookStore.DataAccess.Repositoris;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.
builder.Services
    .AddEntityFrameworkSqlite()
    .AddDbContext<DataContext>(opt =>
    opt.UseSqlite( connectionString,
        b => b.MigrationsAssembly("BookStore.Api")));
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//services cors
    builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
    {
        builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    }));
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IGanreRepository, GanreRepository>();
builder.Services.AddScoped<IGanreService, GanreService>();
builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
builder.Services.AddScoped<IAuthorService, AuthorService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    dataContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("corsapp");

app.MapControllers();

app.Run();
