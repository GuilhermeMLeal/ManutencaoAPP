using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserAuth.API.DTOs;
using UserAuth.API.Validation.Controllers.Validation;
using UserAuth.Application.Interfaces;

namespace UserAuth.API.Controllers
{
    //[ServiceFilter(typeof(VerifyToken))]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        //[Authorize(Roles = "users:admin")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserDTO userDTO)
        {
            await _userService.AddUser(userDTO);

            // Recupera o usuário criado para obter o Id
            //var createdUser = await _userService.GetUserByEmail(userDTO.Email);
            //if (createdUser == null) return BadRequest("Erro ao criar usuário.");
            return Ok();
         //   return CreatedAtAction(nameof(GetUser), new { id = userDTO.Id }, userDTO);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "users:admin")]
        public async Task<IActionResult> UpdateUser(int id, UserDTO userDTO)
        {
            var existingUser = await _userService.GetUserById(id);
            if (existingUser == null) return NotFound();

            await _userService.UpdateUser(id, userDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = "users:admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var existingUser = await _userService.GetUserById(id);
            if (existingUser == null) return NotFound();

            await _userService.DeleteUser(id);
            return NoContent();
        }
    }
}
