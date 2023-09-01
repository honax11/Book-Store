
using BookStore.BusinessLogic.Helfer;
using BookStore.BusinessLogic.Helfer.Dropbox;
using BookStore.BusinessLogic.Services;
using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.DataAccess.Data;
using BookStore.DataAccess.Repositoris.DapperRepositories;
using BookStore.DataAccess.Repositoris.EFCoreRepositories;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var droperBox = builder.Configuration.GetSection("DropBoxAccessToken");

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
builder.Services.AddScoped<IProductRepository, ProductEFCoreRepository>();
builder.Services.AddScoped<IGanreRepository, GanreEFCoreRepository>();
builder.Services.AddScoped<IGanreService, GanreService>();
builder.Services.AddScoped<IAuthorRepository, AuthorEFCoreRepository>();
builder.Services.AddScoped<IAuthorService, AuthorService>();
builder.Services.AddScoped<IBannerRepository, BannerEFCoreRepository>();
builder.Services.AddScoped<IBannerService, BannerService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderRepository, OrderEFCoreRepository>();
builder.Services.AddScoped<IOrderItemService, OrderItemService>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemEFCoreRepository>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IDropBoxFilesService, DropboxFileExchange>();

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
