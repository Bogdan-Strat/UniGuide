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
        //public void SaveSalt(string salt, User user)
        //{
        //    var saltObject = new Salt
        //    {
        //        Id = Guid.NewGuid(),
        //        Salt1 = salt,
        //    };

        //    user.Salt = saltObject;

        //    //UnitOfWork.Salts.Insert(saltObject);
        //}
        public async Task RegisterNewUser(RegisterModel registerModel)
        {
            (await RegisterUserValidator.ValidateAsync(registerModel)).ThenThrow();

            var isPasswordValid = IsPasswordValid(registerModel.Password);

            var generatedSalt = GenereateSalt();

            //var user = new User()
            //{
            //    Id = Guid.NewGuid(),
            //    Email = registerModel.Email,
            //    Username = registerModel.Username,
            //    IsDeleted = false
            //};

            //SaveSalt(generatedSalt, user);

            //user.PasswordHash = ComputeFinalPassword(generatedSalt, registerModel.Password);

            //UnitOfWork.Users.Insert(user);

            await UnitOfWork.SaveChangesAsync();
        }

        //public async Task<User> GetUserAccount(Guid userId)
        //{
        //    var user = await UnitOfWork.Users.Get()
        //        .FirstOrDefaultAsync(u => u.Id == userId);

        //    return user;
        //}

        public async Task<CurrentUserDTO> Login(LogInModel model)
        {

            //var user = await UnitOfWork.Users
            //    .Get()
            //    .Where(u => u.Email == model.Email /*|| u.Username == model.Username*/ && u.GoogleId == null && !u.IsDeleted)
            //    .FirstOrDefaultAsync();

            //if (user == null)
            //{
            //    return new CurrentUserDTO { IsAuthenticated = false };
            //}

            //var salt = UnitOfWork.Salts.Get()
            //    .FirstOrDefault(s => s.Id == user.SaltId);

            //if (salt == null)
            //{
            //    throw new NotFoundErrorException();
            //}

            //var passwordHash = ComputeFinalPassword(salt.Salt1, model.Password);

            //if (string.Equals(passwordHash, user.PasswordHash))
            //{
            //    return new CurrentUserDTO
            //    {
            //        Id = user.Id,
            //        Email = user.Email,
            //        Username = user.Username,
            //        IsAuthenticated = true,
            //    };
            //}
            //else
            //{
            //    return new CurrentUserDTO { IsAuthenticated = false };
            //}
            return new CurrentUserDTO { IsAuthenticated = false };
        }

        public async Task<CurrentUserDTO> LoginAndCreateUserWithGoogleAccount(CreateAccountFromGoogleModel model)
        {
            //var user = await UnitOfWork.Users
            //    .Get()
            //    .Where(u => u.Email == model.Email && u.GoogleId == model.GoogleId && !u.IsDeleted)
            //    .FirstOrDefaultAsync();

            //if (user == null)
            //{
            //    var newUserWithGoogleAccount = new User()
            //    {
            //        Id = Guid.NewGuid(),
            //        Email = model.Email,
            //        Username = model.Username,
            //        GoogleId = model.GoogleId,
            //        Photo = model.Photo,
            //        IsDeleted = false
            //    };

            //    UnitOfWork.Users.Insert(newUserWithGoogleAccount);

            //    await UnitOfWork.SaveChangesAsync();

            //    return new CurrentUserDTO
            //    {
            //        Id = newUserWithGoogleAccount.Id,
            //        Email = newUserWithGoogleAccount.Email,
            //        Username = newUserWithGoogleAccount.Username,
            //        Photo = newUserWithGoogleAccount.Photo,
            //        IsAuthenticated = true,
            //    };
            //}

            //return new CurrentUserDTO
            //{
            //    Id = user.Id,
            //    Email = user.Email,
            //    Username = user.Username,
            //    Photo = user.Photo,
            //    IsAuthenticated = true,
            //};
            return new CurrentUserDTO { IsAuthenticated = false };

        }

        //public bool IsPasswordValid(string password)
        //{
        //    var lowercase = new Regex("[a-z]+");
        //    var uppercase = new Regex("[A-Z]+");
        //    var digit = new Regex("(\\d)+");
        //    var symbol = new Regex("(\\W)+");

        //    return (lowercase.IsMatch(password) && uppercase.IsMatch(password) && digit.IsMatch(password) && symbol.IsMatch(password));
        //}

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
