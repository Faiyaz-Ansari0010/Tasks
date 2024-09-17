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

    using (var stream = new StreamReader(file.OpenReadStream()))
    {
        string? line;
        while ((line = await stream.ReadLineAsync()) != null)
        {
            if (string.IsNullOrWhiteSpace(line))
            {
                continue; // Skip empty or whitespace lines
            }

            var values = line.Split(',');

            // if (values.Length < 14) // Ensure there are enough columns in the line
            // {
            //     continue; // Skip lines that don't have enough data
            // }

            var userRecord = new UserRecord
            {
                EmailID = values[0],
                Name = values[1],
                Country = values[2],
                State = values[3],
                City = values[4],
                Telephone = values[5],
                AddressLine1 = values[6],
                AddressLine2 = values[7],
                DateOfBirth = values[8],
                SalaryFY2019_20 = values[9],
                SalaryFY2020_21 = values[10],
                SalaryFY2021_22 = values[11],
                SalaryFY2022_23 = values[12],
                SalaryFY2023_24 = values[13]
            };

            _context.UserRecords.Add(userRecord);
        }

        await _context.SaveChangesAsync();
    }

    return Ok("File uploaded successfully.");
}


        // PUT: api/UserRecords/{email}
        [HttpPut("{email}")]
        public async Task<IActionResult> PutUserRecord(string email, UserRecord userRecord)
        {
            if (email != userRecord.EmailID)
            {
                return BadRequest();
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
                    return NotFound();
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
        public async Task<ActionResult<IEnumerable<UserRecord>>> GetUserRecords()
        {
            return await _context.UserRecords.ToListAsync();
        }

        private bool UserRecordExists(string email)
        {
            return _context.UserRecords.Any(e => e.EmailID == email);
        }
    }
}
