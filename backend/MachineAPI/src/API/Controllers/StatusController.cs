using MachineAPI.API.Controllers.Validation;
using MachineAPI.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MachineAPI.src.API.Controllers
{
    [ServiceFilter(typeof(VerifyToken))]
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IStatusService _statusService;

        public StatusController(IStatusService statusService)
        {
            _statusService = statusService;
        }

        // GET: api/places
        [HttpGet]
        public async Task<IActionResult> GetAllStatus()
        {
            try
            {
                var status = await _statusService.GetAllStatus();
                if (status == null || !status.Any())
                    return NotFound(new { message = "No places found." });

                return Ok(status);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving places.", details = ex.Message });
            }
        }

    }
}
