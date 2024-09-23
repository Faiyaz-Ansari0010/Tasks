using CsvDataApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CsvDataApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRecordsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserRecordsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCSV(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var insertValues = new List<string>();

            using (var stream = new StreamReader(file.OpenReadStream()))
            {
                string? line;
                while ((line = await stream.ReadLineAsync()) != null)
                {
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }

                    var values = line.Split(',');

                    var valueString = $"('{values[0]}', '{values[1]}', '{values[2]}', '{values[3]}', '{values[4]}', " +
                                      $"'{values[5]}', '{values[6]}', '{values[7]}', '{values[8]}', '{values[9]}', " +
                                      $"'{values[10]}', '{values[11]}', '{values[12]}', '{values[13]}')";

                    insertValues.Add(valueString);
                }
            }

            if (insertValues.Count > 0)
            {
                var sql = $"INSERT INTO UserRecords (EmailID, Name, Country, State, City, Telephone, " +
                          $"AddressLine1, AddressLine2, DateOfBirth, SalaryFY2019_20, SalaryFY2020_21, " +
                          $"SalaryFY2021_22, SalaryFY2022_23, SalaryFY2023_24) VALUES {string.Join(", ", insertValues)}";

                await _context.Database.ExecuteSqlRawAsync(sql);
            }

            return Ok("File uploaded and records inserted successfully.");
        }

        // PUT: api/UserRecords/{email}
        [HttpPut("{email}")]
        public async Task<IActionResult> PutUserRecord(string email, UserRecord userRecord)
        {
            if (userRecord == null)
            {
                return BadRequest("User record is null.");
            }

            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email parameter is missing.");
            }

            if (email != userRecord.EmailID)
            {
                return BadRequest("Email in URL does not match EmailID in the record.");
            }

            _context.Entry(userRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserRecordExists(email))
                {
                    return NotFound("User record not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // DELETE: api/UserRecords/{email}
        [HttpDelete("{email}")]
        public async Task<IActionResult> DeleteUserRecord(string email)
        {
            var userRecord = await _context.UserRecords.SingleOrDefaultAsync(r => r.EmailID == email);
            if (userRecord == null)
            {
                return NotFound();
            }

            _context.UserRecords.Remove(userRecord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/UserRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRecord>>> GetUserRecords([FromQuery] int startRow = 0, [FromQuery] int rowCount = 27)
        {
            var userRecords = await _context.UserRecords
                .Skip(startRow)
                .Take(rowCount)
                .ToListAsync();

            return Ok(userRecords);
        }


        private bool UserRecordExists(string email)
        {
            return _context.UserRecords.Any(e => e.EmailID == email);
        }
    }
}
