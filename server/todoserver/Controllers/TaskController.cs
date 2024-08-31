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
        public IActionResult GetAllTasks()
        {
            return Ok(_taskService.GetAllTasks());
        }

        [HttpPost]
        public IActionResult AddTask([FromBody] TaskViewModel taskViewModel)
        {
            return Ok(SaveTask(taskViewModel));
        }

        [HttpPut]
        public IActionResult UpdateTask([FromBody] TaskViewModel taskViewModel)
        {
            return Ok(SaveTask(taskViewModel));
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

        [HttpDelete]
        [Route("category/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                var result = _taskService.DeleteCategory(id);
                if(result > 0)
                    return Ok(result);
                else
                    return StatusCode(500, "Error in Deleting Category");
            }
            catch(KeyNotFoundException ex)
            {
                _logger.LogError(ex, "Error in TaskController.AddCategory");
                return BadRequest("Category Not Found");
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error in TaskController.SaveCategory");
                return StatusCode(500, "Error in TaskController.SaveCategory");
            }
        }

        private IActionResult SaveTask(TaskViewModel taskViewModel)
        {
            try
            {
                var result = _taskService.SaveTask(taskViewModel);
                return Ok(result);
            }
            catch(ArgumentException ex)
            {
                _logger.LogError(ex, "Error in TaskController.SaveTask");
                return BadRequest(new {message =  ex.Message});
            }
            catch(KeyNotFoundException ex)
            {
                _logger.LogError(ex, "Error in TaskController.SaveTask");
                return BadRequest("Task Not Found");
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error in TaskController.SaveTask");
                return StatusCode(500, "Error in TaskController.SaveTask");
            }
        }
        private IActionResult SaveCategory(CategoryViewModel categoryViewModel)
        {
            try
            {
                var result = _taskService.SaveCategory(categoryViewModel);
                return Ok(result);
            }
            catch(ArgumentException ex)
            {
                _logger.LogError(ex, "Error in TaskController.SaveCategory");
                return BadRequest(new {message =  ex.Message});
            }
            catch(KeyNotFoundException ex)
            {
                _logger.LogError(ex, "Error in TaskController.SaveCategory");
                return BadRequest("Category Not Found");
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error in TaskController.SaveCategory");
                return StatusCode(500, "Error in TaskController.SaveCategory");
            }
        }
    }
}
