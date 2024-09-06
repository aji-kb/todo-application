using System;
using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using todoserver.Data.Contract;
using todoserver.Data.Model;

namespace todoserver.Data;

public class TaskDbContext: DbContext
{

    private readonly IConfiguration _configuration;

    public TaskDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public TaskDbContext(DbContextOptions<TaskDbContext> options, IConfiguration configuration): base(options)
    {
        _configuration = configuration;
    }

    public DbSet<Category> Categories {get;set;}
    public DbSet<Model.Task> Tasks {get;set;}
    public DbSet<TaskCategory> TaskCategories {get;set;}
    public DbSet<User> Users {get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("TaskManager");
        modelBuilder.Entity<Category>().ToTable("Category");
        modelBuilder.Entity<Model.Task>().ToTable("Task");
        modelBuilder.Entity<TaskCategory>().ToTable("TaskCategory");

        modelBuilder.Entity<Model.Task>().HasQueryFilter(x=>x.CreatedBy == _configuration["useremail"]);
        modelBuilder.Entity<Model.TaskCategory>().HasQueryFilter(x=>x.CreatedBy == _configuration["useremail"]);
        modelBuilder.Entity<Model.Category>().HasQueryFilter(x=>x.CreatedBy == _configuration["useremail"]);
        base.OnModelCreating(modelBuilder);
    }

    public override int SaveChanges()
    {
        var trackedEntites = this.ChangeTracker.Entries();

        foreach(var trackedEntity in trackedEntites)
        {
            if(trackedEntity.Entity is ITrackedEntity)
            {
                var entity = (TrackedEntity)trackedEntity.Entity;
                if(entity != null)
                {
                    if(trackedEntity.State == EntityState.Added)
                    {
                        entity.CreatedDate = DateTime.UtcNow;
                        entity.CreatedBy = _configuration["useremail"];
                    }
                    else if(trackedEntity.State == EntityState.Modified)
                    {
                        entity.ModifiedDate = DateTime.UtcNow;
                        entity.ModifiedBy = _configuration["useremail"];
                    }
                }

            }
        }
        
        return base.SaveChanges();
    }

}
