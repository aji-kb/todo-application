using System;
using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using todoserver.Data.Model;

namespace todoserver.Data;

public class TaskDbContext: DbContext
{
    public TaskDbContext()
    {

    }

    public DbSet<Category> Categories {get;set;}
    public DbSet<Model.Task> Tasks {get;set;}
    public DbSet<TaskCategory> TaskCategories {get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().ToTable("Category");
        modelBuilder.Entity<Model.Task>().ToTable("Task");
        modelBuilder.Entity<TaskCategory>().ToTable("TaskCategory");
        
        base.OnModelCreating(modelBuilder);
    }

}
