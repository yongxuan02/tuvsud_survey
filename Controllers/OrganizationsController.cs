using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tuvsud_survey.Data;
using tuvsud_survey.Model;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationsController : ControllerBase
    {


        [HttpGet]
        public JsonResult Get()
        {
            using (var context = new TuvSudContext())
            {
                           
             var organizations = context.organizations.ToList();
             foreach (var o in organizations)
             {
                    o.industry = context.others.Where(ot => ot.id == o.industry_id).FirstOrDefault();

                    o.supplier_group = context.supplier_group.Where(sg => sg.id == o.supplier_group_id).FirstOrDefault();

                    var types = (from ot in context.others
                              join ct in context.company_types on ot.id equals ct.company_type_id
                              where ct.organizations_id == o.id
                              select new
                              {
                                  company_type_name = ot.name,
                                  company_type_id = ot.id
                              }).ToList();
                 List<company_types> company_types = new List<company_types>();
                 foreach(var t in types)
                 {
                    company_types c = new company_types();
                     c.company_type_name = t.company_type_name;
                     c.company_type_id = t.company_type_id;
                     company_types.Add(c);
                 }

                 o.company_types = company_types;

             }

             return new JsonResult(organizations);
            }

        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            using (var context = new TuvSudContext())
            {
                var o = context.organizations.Where(s => s.id == id).FirstOrDefault();
                if (o != null)
                {
                    var types = (from ot in context.others
                                 join ct in context.company_types on ot.id equals ct.company_type_id
                                 where ct.organizations_id == o.id
                                 select new
                                 {
                                     id = ct.id,
                                     company_type_name = ot.name,
                                     company_type_id = ot.id
                                 }).ToList();
                    List<company_types> company_types = new List<company_types>();
                    foreach (var t in types)
                    {
                        company_types c = new company_types();
                        c.id = t.id;
                        c.company_type_name = t.company_type_name;
                        c.company_type_id = t.company_type_id;
                        c.organizations_id = o.id;

                        company_types.Add(c);
                    }

                    o.company_types = company_types;

                }
                return new JsonResult(o);
            }
        }

        [HttpPost]
        public JsonResult Post([FromBody] organizations o)
        {
            using (var context = new TuvSudContext())
            {
                context.organizations.Add(o);
                context.SaveChanges();
/*                foreach (var ct in o.company_types)
                {
                    //company_types c = new company_types();
                    ct.organizations_id = o.id;
                    ct.id = 0;
                    //c.company_type_id = ct.company_type_id;
                    context.company_types.Add(ct);
                    context.SaveChanges();
                }
*/                

                return new JsonResult(o.id);
            }
        }

        [HttpPut("{id}")]
        public void Update(organizations o)
        {
            using (var context = new TuvSudContext())
            {

                var organization = context.organizations.Where(s => s.id == o.id).FirstOrDefault<organizations>();
                organization.organization_name = o.organization_name;
                organization.industry_id = o.industry_id;
                organization.status = o.status;
                organization.supplier_group_id = o.supplier_group_id;
                organization.uen = o.uen;
                organization.contact_person = o.contact_person;
                organization.contact_no = o.contact_no;
                organization.contact_email = o.contact_email;
                organization.address = o.address;
                context.SaveChanges();

                foreach (var ct in o.company_types)
                {
                    if (ct.id == 0)
                    {
                        context.company_types.Add(ct);
                    }
                    else
                    {
                        var curr_ct = context.company_types.Where(s => s.id == ct.id).FirstOrDefault();
                        if (ct.organizations_id == 0)
                        {
                            context.company_types.Remove(curr_ct);
                        }
                        else
                        {
                            curr_ct.company_type_id = ct.company_type_id;
                        }

                    }
                    context.SaveChanges();
                    //context.Entry(o).State = EntityState.Modified;
                    //                context.Entry(o.company_types).State = EntityState.Modified;
                    //context.SaveChanges();
                }

            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var context = new TuvSudContext())
            {
                var organization = context.organizations.Where(s => s.id == id).FirstOrDefault();
                if(organization!=null)
                {
                    var company_types = context.company_types.Where(s => s.organizations_id == id).ToList();
                    foreach(var ct in company_types)
                    {
                        context.company_types.Remove(ct);
                        context.SaveChanges();
                    }
                    context.organizations.Remove(organization);
                    context.SaveChanges();
                }
            }
        }



        [HttpGet("/search/{param}")]
        public JsonResult GetByName(string name)
        {
            using (var context = new TuvSudContext())
            {
                var organizations = context.organizations.Where(s => s.organization_name.Contains(name)).ToList();
                return new JsonResult(organizations);
            }
        }

    }
}
