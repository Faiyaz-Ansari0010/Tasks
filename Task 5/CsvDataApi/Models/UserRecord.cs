using System.ComponentModel.DataAnnotations;

namespace CsvDataApi.Models
{
    public class UserRecord
    {
        // public int Id { get; set; }
        [Key]
        public required string? EmailID { get; set; }
        public string? Name { get; set; } = string.Empty;
        public string? Country { get; set; } = string.Empty;
        public string? State { get; set; } = string.Empty;
        public string? City { get; set; } = string.Empty;
        public string? Telephone { get; set; } = string.Empty;
        public string? AddressLine1 { get; set; } = string.Empty;
        public string? AddressLine2 { get; set; } = string.Empty;
        public string? DateOfBirth { get; set; }
        public string? SalaryFY2019_20 { get; set; }
        public string? SalaryFY2020_21 { get; set; }
        public string? SalaryFY2021_22 { get; set; }
        public string? SalaryFY2022_23 { get; set; }
        public string? SalaryFY2023_24 { get; set; }
    }
}
