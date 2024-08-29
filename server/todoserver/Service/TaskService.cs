using System;
using Microsoft.EntityFrameworkCore;
using todoserver.Data;
using todoserver.Data.Model;
using todoserver.Service.ViewModel;

namespace todoserver.Service;

public class TaskService : ITaskService
{

    public TaskDbContext _taskDbContext;

    public TaskService(TaskDbContext taskDbContext)
    {
        _taskDbContext = taskDbContext;
    }

    public List<CategoryViewModel> GetAllCategories()
    {
        var categories = _taskDbContext.Categories.Select(x=>new CategoryViewModel{Id = x.Id, CategoryName = x.CategoryName});

        return categories.ToList();
    }

    public CategoryViewModel SaveCategory(CategoryViewModel categoryViewModel)
    {
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
            return new CategoryViewModel{Id = category.Id, CategoryName = category.CategoryName};
        }
    }
}
