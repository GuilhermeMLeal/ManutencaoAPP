using Maintenance.Controllers.Validation;
using Maintenance.Models;
using Microsoft.AspNetCore.Mvc;

namespace Maintenance.Controllers
{   
    [ServiceFilter(typeof(VerifyToken))]
    [ApiController]
    [Route("api/[controller]")]
    public class MaintenanceController : ControllerBase
    {
        private readonly Maintenance.Business.MaintenanceBusiness _business;

        public MaintenanceController(Business.MaintenanceBusiness business)
        {
            _business = business;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var maintenances = await _business.GetAllAsync();
                return Ok(maintenances);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var maintenance = await _business.GetByIdAsync(id);
                if (maintenance == null) return NotFound();
                return Ok(maintenance);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Models.Maintenance maintenance)
        {
            try
            {
                if (maintenance == null)
                    return BadRequest(new { message = "Invalid maintenance data." });

                await _business.AddAsync(maintenance);
                return CreatedAtAction(nameof(GetById), new { id = maintenance.Id }, maintenance);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] Models.Maintenance maintenance)
        {
            try
            {
                await _business.UpdateAsync(maintenance);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
