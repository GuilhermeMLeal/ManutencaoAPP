using Microsoft.AspNetCore.Mvc;
using MachineAPI.API.DTOs;
using MachineAPI.Application.Interfaces;

namespace MachineAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly IPlaceService _placeService;

        public PlacesController(IPlaceService placeService)
        {
            _placeService = placeService;
        }

        // GET: api/places
        [HttpGet]
        public async Task<IActionResult> GetAllPlaces()
        {
            try
            {
                var places = await _placeService.GetAllPlaces();
                if (places == null || !places.Any())
                    return NotFound(new { message = "No places found." });

                return Ok(places);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving places.", details = ex.Message });
            }
        }

        // GET: api/places/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlaceById(int id)
        {
            try
            {
                var place = await _placeService.GetPlaceById(id);
                if (place == null)
                    return NotFound(new { message = $"Place with ID {id} not found." });

                return Ok(place);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the place.", details = ex.Message });
            }
        }

        // POST: api/places
        [HttpPost]
        public async Task<IActionResult> AddPlace([FromBody] PlaceDTO placeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var place = await _placeService.AddPlace(placeDto);
                return CreatedAtAction(nameof(GetPlaceById), new { id = place.Id }, place);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while adding the place.", details = ex.Message });
            }
        }

        // PUT: api/places/{id}
        [HttpPut]
        public async Task<IActionResult> UpdatePlace([FromBody] PlaceDTO placeDto)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedPlace = await _placeService.UpdatePlace(placeDto);
                if (updatedPlace == null)
                    return NotFound(new { message = $"Place with ID {placeDto.Id} not found." });

                return Ok(updatedPlace);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the place.", details = ex.Message });
            }
        }

        // DELETE: api/places/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            try
            {
                var place = await _placeService.GetPlaceById(id);
                if (place == null)
                    return NotFound(new { message = $"Place with ID {id} not found." });

                await _placeService.DeletePlace(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the place.", details = ex.Message });
            }
        }
    }
}
