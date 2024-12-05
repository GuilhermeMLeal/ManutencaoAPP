using System.ComponentModel.DataAnnotations.Schema;

namespace Maintenance.Models
{
    public class Maintenance
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int MachineId { get; set; }
        public string Observations { get; set; }
        public DateTime LastUpdate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<MaintenancePart> MaintenanceParts { get; set; } = new();
    }

    public class MaintenancePart
    {
        public int Id { get; set; }
        public int MaintenanceId { get; set; }
        public Maintenance Maintenance { get; set; }
        public int PartId { get; set; }
        public int Quantity { get; set; }
    }

}
