using BusinessLogic.Base;
using BusinessLogic.Implementation.UserAccount.Models;
using Common.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Common.DTOs;
using System.Text.RegularExpressions;
using BusinessLogic.Implementation.UserAccount.Validations;
using Common.ValidationExtensions;
using Domain.Entities;

namespace BusinessLogic.Implementation.UserAccount
{
    public class UserService : BaseService
    {
        private readonly RegisterUserValidator RegisterUserValidator;
        public UserService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
            RegisterUserValidator = new RegisterUserValidator(UnitOfWork);
        }

        public string ConcatenateStrings(string word1, string word2)
        {
            var sb = new StringBuilder();
            sb.Append(word1);
            sb.Append(word2);

            return sb.ToString();
        }
        public string GenereateSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt();
        }
        public string HashPassword(string password, string salt)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public string ComputeFinalPassword(string salt, string password)
        {
            var finalPassword = BCrypt.Net.BCrypt.HashPassword(password.Trim(), salt.Trim());

            return finalPassword;
        }

        public async Task RegisterNewUser(RegisterModel registerModel)
        {
            // (await RegisterUserValidator.ValidateAsync(registerModel)).ThenThrow();

            var isPasswordValid = IsPasswordValid(registerModel.Password);

            var user = new User()
            {
                Id = Guid.NewGuid(),
                Email = registerModel.Email,
                Name = registerModel.Name,
                HashedPassword = registerModel.Password,
                PhoneNumber = registerModel.PhoneNumber,
                Budget = 0,
                AvgGrade = 0,
                Balance = 2,
                HomeUniversity = "N/A",
                IsEu = true,
                IsFirstTime = true,

            };


            UnitOfWork.Users.Insert(user);

            await UnitOfWork.SaveChangesAsync();
        }

        public async Task<CurrentUserDTO> Login(LogInModel model)
        {

            var user = await UnitOfWork.Users
                .Get()
                .Where(u => u.Email == model.Email && model.Password == u.HashedPassword)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return new CurrentUserDTO { IsAuthenticated = false };
            }

            return new CurrentUserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Budget = user.Budget,
                IsFirstTime = (bool)user.IsFirstTime,
                HomeCountry = user.HomeUniversity,
                Grade = user.AvgGrade,
                IsAuthenticated = true,
            };
        }

        public async Task<List<CreateUniversityReportModel>> GetListOfUniversitiesForCreateUniversityReport(CreateProfileModel model)
        {
            var countries = new List<string>
        {
            "Austria",
            "Belgium",
            "Bulgaria",
            "Croatia",
            "Cyprus",
            "Czech Republic",
            "Denmark",
            "Estonia",
            "Finland",
            "France",
            "Germany",
            "Greece",
            "Hungary",
            "Ireland",
            "Italy",
            "Latvia",
            "Lithuania",
            "Luxembourg",
            "Malta",
            "Netherlands",
            "Poland",
            "Portugal",
            "Romania",
            "Slovakia",
            "Slovenia",
            "Spain",
            "Sweden"
        };

            var isEU = countries.Contains(model.Country);
            List<CreateUniversityReportModel> universities = new();

            if (isEU)
            {
                universities = await UnitOfWork.Universities.Get()
                    .Select(u => new CreateUniversityReportModel()
                    {
                        Id = u.Id,
                        University = u.Name,
                        IsChecked = u.AvgGrade <= model.Grade && u.MonthBudgetEu <= model.Budget
                    })
                    .ToListAsync();
            }
            else
            {
                universities = await UnitOfWork.Universities.Get()
                    .Select(u => new CreateUniversityReportModel()
                    {
                        Id = u.Id,
                        University = u.Name,
                        IsChecked = u.AvgGrade <= model.Grade && u.MonthBudgetNonEu <= model.Budget
                    })
                    .ToListAsync();
            }

            var user = await UnitOfWork.Users.Get()
                .Where(u => u.Id == CurrentUser.Id)
                .FirstOrDefaultAsync();


            user.Budget = model.Budget;
            user.HomeUniversity = model.Country;
            user.AvgGrade = model.Grade;

            UnitOfWork.Users.Update(user);
            await UnitOfWork.SaveChangesAsync();

            return universities;
        }


        public async Task SaveUniversityReport(List<CreateUniversityReportModel> universities)
        {
            var user = await UnitOfWork.Users.Get()
                .Where(u => u.Id == CurrentUser.Id)
                .FirstOrDefaultAsync();

            user.IsFirstTime = false;


            foreach(var university in universities)
            {
                if (university.IsChecked)
                {
                    var univ = await UnitOfWork.Universities.Get()
                        .Where(u => u.Id == university.Id)
                        .FirstOrDefaultAsync();

                    user.Universities.Add(univ);
                }
            }

            UnitOfWork.Users.Update(user);
            await UnitOfWork.SaveChangesAsync();
        }

        public async Task<GetProfileModel> GetProfile()
        {
            var user = await UnitOfWork.Users.Get()
                .Where(u => u.Id == CurrentUser.Id)
                .Select(u => new GetProfileModel()
                {
                    Country = u.HomeUniversity,
                    Budget = u.Budget,
                    Grade = u.AvgGrade,
                    Balance = u.Balance
                })
                .FirstOrDefaultAsync();

            return user;
        }


        public async Task AddBalance(decimal balance)
        {
            var user = await UnitOfWork.Users.Get()
                .Where(u => u.Id == CurrentUser.Id)
                .FirstOrDefaultAsync();

            user.Balance += balance;

            UnitOfWork.Users.Update(user);
            await UnitOfWork.SaveChangesAsync();
        }
        public static bool IsPasswordValid(string password)
        {
            var lowercase = new List<char>() { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };

            var upperCase = new List<char>() { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

            var digit = new List<char>() { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

            var symbol = new List<char>() { '!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', ';', ':', ',', '.', '/', '<', '>', '?', '~', '`', '^' };

            if (password.Length < 6 || password.Length > 15)
                return false;

            var hasLowercase = false;
            var hasUppercase = false;
            var hasDigit = false;
            var hasSymbol = false;

            foreach (var character in password)
            {
                if (lowercase.Contains(character))
                {
                    hasLowercase = true;
                }
                else if (upperCase.Contains(character))
                {
                    hasUppercase = true;
                }
                else if (digit.Contains(character))
                {
                    hasDigit = true;
                }
                else if (symbol.Contains(character))
                {
                    hasSymbol = true;
                }
            }

            if (hasLowercase && hasUppercase && hasDigit && hasSymbol)
            {

                return true;
            }

            return false;

        }
    }
}
