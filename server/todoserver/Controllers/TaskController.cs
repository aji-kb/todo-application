using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todoserver.Service;
using todoserver.Service.ViewModel;

namespace todoserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly ITaskService _taskService;
        private readonly ILogger<TaskController> _logger;

        public TaskController(ITaskService taskService, ILogger<TaskController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }

        [HttpGet]
        [Route("categories")]
        public IActionResult GetAllCategories()
        {
            var categories = _taskService.GetAllCategories();

            if(categories != null)
                return Ok(categories);
            else
                return StatusCode(500, "Error in loading categories");
        }

        [HttpPost]
        [Route("category")]
        public IActionResult AddCategory([FromBody] CategoryViewModel categoryViewModel)
        {
            return SaveCategory(categoryViewModel);
        }

        [HttpPut]
        [Route("category")]
        public IActionResult UpdateCategory([FromBody] CategoryViewModel categoryViewModel)
        {
            return SaveCategory(categoryViewModel);
        }

        public IActionResult SaveCategory(CategoryViewModel categoryViewModel)
        {
            try
            {
                var result = _taskService.SaveCategory(categoryViewModel);
                return Ok(result);
            }
            catch(KeyNotFoundException ex)
            {
                _logger.LogError(ex, "Error in TaskController.AddCategory");
                return BadRequest("Category Not Found");
            }
        }
    }
}
