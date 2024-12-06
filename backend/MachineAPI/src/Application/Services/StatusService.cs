using MachineAPI.Application.Interfaces;
using MachineAPI.API.DTOs;
using MachineAPI.API.Extensions;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using MachineAPI.src.API.DTOs;

namespace MachineAPI.Application.Services
{
    public class StatusService : IStatusService
    {
        private readonly IStatusRepository _statusRepository;

        public StatusService(IStatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }

        public async Task<IEnumerable<StatusDTO>> GetAllStatus()
        {
            var status = await _statusRepository.GetAllAsync();
            if (status == null || !status.Any())
            {
                throw new InvalidOperationException("No machines found.");
            }
            return status.Select(m => m.ToDtoStatus());
        }

        public async Task<StatusDTO> GetStatusById()
        {
            var status = await _statusRepository.GetStatusById();
            if (status == null)
            {
                throw new InvalidOperationException("No machines found.");
            }
            return status.ToDtoStatus();
        }
    }
}
