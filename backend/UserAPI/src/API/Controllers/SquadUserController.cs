using Microsoft.AspNetCore.Mvc;
using Squad.API.DTOs;
using UserAuth.Application.Interfaces;

namespace AuthMicroservice.src.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SquadUserController : ControllerBase
    {
        private readonly ISquadService _squadService;

        public SquadUserController(ISquadService squadService)
        {
            _squadService = squadService;
        }

        [HttpDelete("{squadId}")]
        public async Task<IActionResult> DeleteAll(int squadId)
        {
            try
            {
                await _squadService.DeleteAllUsersOfSquads(squadId);
                return Ok(new { message = "Todos os usuários foram removidos do squad." });
            }
            catch (Exception ex)
            {
                // Log a mensagem da exce��o (se um sistema de log estiver configurado)
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }
        [HttpPut("{squadId}")]
        public async Task<IActionResult> UpdateBySquad(int squadId, [FromBody]SquadDTO squadDTO)
        {
            try
            {
                await _squadService.DeleteAllUsersOfSquads(squadId);
                await _squadService.AddSquadToUser(squadId, squadDTO);
                return Ok(new { message = "Todos os usuários foram removidos do squad." });
            }
            catch (Exception ex)
            {
                // Log a mensagem da exce��o (se um sistema de log estiver configurado)
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }
    }
}
