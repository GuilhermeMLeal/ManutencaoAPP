using Microsoft.AspNetCore.Mvc;
using MachineAPI.Application.Interfaces;
using MachineAPI.API.DTOs;
using MachineAPI.src.API.DTOs;

namespace MachineAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        private readonly IMachineService _machineService;

        public MachinesController(IMachineService machineService)
        {
            _machineService = machineService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMachines()
        {
            try
            {
                var machines = await _machineService.GetAllMachines();
                return Ok(machines);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the machines.", details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMachineById(int id)
        {
            try
            {
                var machine = await _machineService.GetMachineById(id);
                return Ok(machine);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the machine.", details = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddMachine([FromBody] MachineCreateDto machineCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var machine = await _machineService.AddMachine(machineCreateDto);
                return CreatedAtAction(nameof(GetMachineById), new { id = machine.Id }, machine);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while adding the machine.", details = ex.Message });
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMachine([FromBody] MachineUpdateDto machineUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedMachine = await _machineService.UpdateMachine(machineUpdateDto);
                return Ok(updatedMachine);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the machine.", details = ex.Message });
            }
        }
    }
}
