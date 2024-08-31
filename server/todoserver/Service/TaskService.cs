using System;
using System.Text;
using Microsoft.EntityFrameworkCore;
using todoserver.Data;
using todoserver.Data.Model;
using todoserver.Service.ViewModel;

namespace todoserver.Service;

public class TaskService : ITaskService
{

    private readonly ILogger<TaskService> _logger;

    private TaskDbContext _taskDbContext;

    public TaskService(TaskDbContext taskDbContext, ILogger<TaskService> logger)
    {
        _taskDbContext = taskDbContext;
        _logger = logger;
    }

    public List<CategoryViewModel> GetAllCategories()
    {
        var categories = _taskDbContext.Categories.Select(x=>new CategoryViewModel{Id = x.Id, CategoryName = x.CategoryName});

        return categories.ToList();
    }

    public CategoryViewModel SaveCategory(CategoryViewModel categoryViewModel)
    {
        var result = _taskDbContext.Categories.Where(x=>x.Id != categoryViewModel.Id && x.CategoryName == categoryViewModel.CategoryName);
        if(result.Count() > 0)
            throw new ArgumentException("Category Name already exists");
        if(categoryViewModel.Id > 0)
        {
            var category = _taskDbContext.Categories.FirstOrDefault(x=>x.Id == categoryViewModel.Id);
            if(category != null)
            {
                category.CategoryName = categoryViewModel.CategoryName;
                _taskDbContext.SaveChanges();
                return new CategoryViewModel{Id = category.Id, CategoryName = category.CategoryName};
            }
            else
            {
                throw new KeyNotFoundException("Category Not Found");   //Change to Custom Exception later
            }
        }
        else
        {
            var category = new Category{ CategoryName = categoryViewModel.CategoryName};
            _taskDbContext.Add<Category>(category);
            _taskDbContext.SaveChanges();
            return new CategoryViewModel{Id = category.Id, CategoryName = category.CategoryName};
        }
    }

    public int DeleteCategory(int id)
    {
        _logger.LogInformation($"Deleting Category for id: {id}");

        if(id > 0)
        {
            var category = _taskDbContext.Categories.FirstOrDefault(x=>x.Id == id);
            if(category != null)
            {
                _taskDbContext.Remove(category);
                var result = _taskDbContext.SaveChanges();
                _logger.LogInformation($"Category deletion successful. result : {result}");
                return result;
            }
            else
                throw new KeyNotFoundException("Category not found");    
        }
        else
            throw new KeyNotFoundException("Category not found");
    }

    public List<TaskViewModel> GetAllTasks()
    {
        var tasks = _taskDbContext.Tasks.Select((t)=>new TaskViewModel{Id = t.Id, TaskName = t.TaskName, DueDate = t.DueDate, IsCompleted = t.IsCompleted });

        return tasks.ToList();
    }

    public TaskViewModel SaveTask(TaskViewModel taskViewModel)
    {
        var saveResult = 0;
        var validationResult = ValidateTask(taskViewModel);

        if(!string.IsNullOrEmpty(validationResult))
            throw new ArgumentException(validationResult);

        Data.Model.Task? task;
        if(taskViewModel.Id > 0)
        {
            //existing task. update it
            task = _taskDbContext.Tasks.Include(x=>x.TaskCategory).FirstOrDefault(x=>x.Id == taskViewModel.Id);
            if(task == null)
                throw new KeyNotFoundException("Task not found");
            else
            {
                task.TaskName = taskViewModel.TaskName;
                task.DueDate = taskViewModel.DueDate;
                task.IsCompleted = taskViewModel.IsCompleted;
            }
            if(task.TaskCategory != null)
            {
                if(task.TaskCategory.CategoryId != taskViewModel.CategoryId)
                {
                    task.TaskCategory = new TaskCategory
                    {
                        CategoryId = taskViewModel.CategoryId
                    };
                }
            }
        }
        else
        {
            task = new Data.Model.Task
            {
                TaskName= taskViewModel.TaskName,
                DueDate = taskViewModel.DueDate,
                IsCompleted=taskViewModel.IsCompleted
            };

            task.TaskCategory = new TaskCategory
            {
                CategoryId = taskViewModel.CategoryId
            };
            
            _taskDbContext.Add(task);
        }

        saveResult = _taskDbContext.SaveChanges();
        if(saveResult > 0)
        {
            return new TaskViewModel
            {
                TaskName = task.TaskName,
                DueDate = task.DueDate,
                Id = task.Id,
                IsCompleted = task.IsCompleted
            };
        }
        else
            throw new Exception("Failed to save Task"); // TODO: need to identify what exception we can throw here
    }

    private string ValidateTask(TaskViewModel task)
    {
        StringBuilder errorMessage = new StringBuilder();
        if(string.IsNullOrEmpty(task.TaskName))
            errorMessage.Append("TaskName is required");

        return errorMessage.ToString();
    }
}
