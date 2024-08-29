
using todoserver.Service.ViewModel;

namespace todoserver.Service;

public interface ITaskService
{
    List<CategoryViewModel> GetAllCategories();
    CategoryViewModel SaveCategory(CategoryViewModel categoryViewModel);
}