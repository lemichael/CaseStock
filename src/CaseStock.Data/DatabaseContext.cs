using CaseStock.Identity;
using Microsoft.EntityFrameworkCore;

namespace CaseStock.UI.Data
{
    public class DatabaseContext : IdentityDatabaseContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }
    }
}
