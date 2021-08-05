using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace tuvsud_survey.Data
{
    public class TuvSudContext: DbContext
    {

        public DbSet<Model.question> questions { get; set; }
        public DbSet<Model.question_options> question_options { get; set; }
        public DbSet<Model.input_types> input_types { get; set; }
        public DbSet<Model.others> others { get; set; }
        public DbSet<Model.others_type> others_type { get; set; }
        public DbSet<Model.company_types> company_types { get; set; }
        public DbSet<Model.user_question_filter> user_question_filter { get; set; }
        public DbSet<Model.organizations> organizations { get; set; }
        public DbSet<Model.supplier_group> supplier_group { get; set; }

        public DbSet<Model.users> users { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(AppDomain.CurrentDomain.BaseDirectory).AddJsonFile("appsettings.json").Build();
            options.UseSqlServer(configuration.GetConnectionString("tuvsudAppCon"));
        }




    }
}
