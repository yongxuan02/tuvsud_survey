using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using tuvsud_survey.Data;
using tuvsud_survey.Model;

namespace tuvsud_survey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {


        [HttpGet]
        public JsonResult Get()
        {
            using (var context = new TuvSudContext())
            {

                var result = (from u in context.users
                              join o in context.organizations on u.organizations_id equals o.id 
                              join c in context.others on u.user_type_id equals c.id
                              select new
                              {
                                  id = u.id,
                                  first_name = u.first_name,
                                  last_name = u.last_name,
                                  email = u.email,
                                  admin = u.admin,
                                  username = u.username,
                                  org_id = o.id,
                                  organization_name = o.organization_name,
                                  user_type = c.name,
                                  status = u.status,
                                  created_dt = u.created_dt.ToString("dd MMM yyyy"),
                                  types = (from ot in context.others
                                           join ct in context.company_types on ot.id equals ct.company_type_id
                                           where ct.organizations_id == o.id
                                           select new
                                           {
                                               company_type_name = ot.name,
                                               company_type_id = ot.id
                                           }).ToList()
                            }).ToList();
               

                return new JsonResult(result);
            }

        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            using (var context = new TuvSudContext())
            {
                var user = context.users.Where(s => s.id == id).FirstOrDefault();
                return new JsonResult(user);
            }
        }

        [HttpPut("changepassword")]
        public JsonResult ChangePassword(users u)
        {
            using (var context = new TuvSudContext())
            {
                var user = context.users.Where(s => s.id == u.id && s.password_hashed == u.old_password).FirstOrDefault<users>();
                if (user != null)
                {
                    user.password_hashed = u.password_hashed;

                    context.SaveChanges();
                    return new JsonResult(new { status=true });
                }
                else
                {
                    return new JsonResult(new { status = false });
                }
            }
        }

        [HttpPost]
        public JsonResult Post([FromBody] users o)
        {
            using (var context = new TuvSudContext())
            {
                context.Add(o);
                context.SaveChanges();
                return new JsonResult(o.id);
            }
        }

        [HttpPut("{id}")]
        public void Update(users o)
        {
            using (var context = new TuvSudContext())
            {
                context.Entry(o).State = EntityState.Modified;
                context.SaveChanges();

            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var context = new TuvSudContext())
            {
                var u = context.users.Where(s => s.id == id).FirstOrDefault();
                if(u!=null)
                {
                    context.users.Remove(u);
                    context.SaveChanges();
                }
            }
        }



        [HttpGet("/search/{param}")]
        public JsonResult GetByName(string username)
        {
            using (var context = new TuvSudContext())
            {
                var u = context.users.Where(s => s.username.Equals(username)).FirstOrDefault();
                return new JsonResult(u);
            }
        }

    }
}
