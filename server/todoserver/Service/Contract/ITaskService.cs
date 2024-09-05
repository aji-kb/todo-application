
using todoserver.Service.ViewModel;

namespace todoserver.Service;

public interface ITaskService
{
    List<TaskViewModel> GetAllTasks();
    TaskViewModel GetTaskById(int id);
    TaskViewModel SaveTask(TaskViewModel task);
    List<CategoryViewModel> GetAllCategories();
    CategoryViewModel SaveCategory(CategoryViewModel categoryViewModel);
    int DeleteCategory(int id);
    int DeleteTask(int id);
}