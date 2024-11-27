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
            var machines = await _machineService.GetAllMachines();
            return Ok(machines);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMachineById(int id)
        {
            try
            {
                var machine = await _machineService.GetMachineById(id);
                return Ok(machine);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddMachine([FromBody] MachineCreateDto machineCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var machine = await _machineService.AddMachine(machineCreateDto);
            return CreatedAtAction(nameof(GetMachineById), new { id = machine.Id }, machine);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMachine(int id, [FromBody] MachineUpdateDto machineUpdateDto)
        {
            if (id != machineUpdateDto.Id)
                return BadRequest("ID mismatch.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedMachine = await _machineService.UpdateMachine(machineUpdateDto);
                return Ok(updatedMachine);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
