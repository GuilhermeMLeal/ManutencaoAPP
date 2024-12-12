using Microsoft.AspNetCore.Mvc;
using Squad.API.DTOs;
using UserAuth.API.DTOs;
using UserAuth.API.Validation.Controllers.Validation;
using UserAuth.Application.Helpers;
using UserAuth.Application.Interfaces;
using UserAuth.Application.Services;

namespace UserAuth.API.Controllers
{
    //[ServiceFilter(typeof(VerifyToken))]
    [ApiController]
    [Route("api/[controller]")]
    public class SquadController : ControllerBase
    {
        private readonly ISquadService _squadService;

        public SquadController(ISquadService squadService)
        {
            _squadService = squadService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var squads = await _squadService.GetAllSquads();
                return Ok(squads);
            }
            catch (Exception ex)
            {
                // Log a mensagem da exce��o (se um sistema de log estiver configurado)
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var squad = await _squadService.GetSquadById(id);
                return Ok(squad);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = $"Squad with ID {id} not found." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SquadDTO squadDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _squadService.AddSquad(squadDTO);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SquadDTO squadDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _squadService.UpdateSquad(id, squadDTO);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = $"Squad with ID {id} not found." });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _squadService.DeleteSquad(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = $"Squad with ID {id} not found." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

    }
}
