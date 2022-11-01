using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MechanicsMateBackend.Models;
using MechanicsMateBackend.Models.VM;
using Microsoft.EntityFrameworkCore;

namespace MechanicsMateBackend.Services
{
    public class UserService
    {
        public async Task AddUser(UserCreate userCreate)
        {
            using (var mme = new MechanicsMateEntities())
            {
                var user = new User();
                var hasher = new PasswordHasher();
                user.Email = userCreate.Email;
                user.PasswordHash = hasher.Hash(userCreate.Password);
                user.FirstName = userCreate.FirstName;
                user.LastName = userCreate.LastName;
                user.UserType = userCreate.UserType;
                mme.Users.Add(user);
                await mme.SaveChangesAsync();
            }
        }
        
        public async Task<bool> LoginUser(UserLogin userLogin)
        {
            using (var mme = new MechanicsMateEntities())
            {
                var user = await mme.Users.Where(u => u.Email == userLogin.Email).FirstOrDefaultAsync();
                if (user == null)
                {
                    return false;
                }
                else
                {
                    var hasher = new PasswordHasher();
                    return hasher.Check(user.PasswordHash, userLogin.Password);
                }
            }
             
        }
    }
}
