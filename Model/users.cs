using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace tuvsud_survey.Model
{
    public class users
    {
        public int id { get; set; }

         public string username { get; set; }

        public string password_hashed { get; set; }

        [NotMapped]
        public string old_password { get; set; }

        public string email { get; set; }

        [Column(TypeName = "TINYINT")]
        public bool admin { get; set; }

        public DateTime ?last_login_dt { get; set; }

        public string first_name { get; set; }

        public string last_name { get; set; }

        [Column(TypeName = "TINYINT")]
        public bool status { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime created_dt { get; set; }
        public int organizations_id { get; set; }
 
        public int user_type_id { get; set; }
       
    }

}
