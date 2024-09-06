using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todoserver.Service;
using todoserver.Service.ViewModel;

namespace todoserver.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
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
        [Route("{id}")]
        public IActionResult GetTask(int id)
        {
            try
            {
                return Ok(_taskService.GetTaskById(id));
            }
            catch(ArgumentNullException aex)
            {
                _logger.LogError(aex, "Task Not Found Error in TaskController.GetTask");
                return BadRequest(aex.Message);
            }
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

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteTask(int id)
        {
            try
            {
                var result = _taskService.DeleteTask(id);
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
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
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
