using BusinessLogic.Implementation.UserAccount.Models;
using DataAccess;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.UserAccount.Validations
{
    public class RegisterUserValidator : AbstractValidator<RegisterModel>
    {
        private readonly UnitOfWork UnitOfWork;
        //private readonly Guid CurrentUserId;
        private bool HasValidPassword(string pw)
        {
            var lowercase = new Regex("[a-z]+");
            var uppercase = new Regex("[A-Z]+");
            var digit = new Regex("(\\d)+");
            var symbol = new Regex("(\\W)+");

            return (lowercase.IsMatch(pw) && uppercase.IsMatch(pw) && digit.IsMatch(pw) && symbol.IsMatch(pw));
        }
        public RegisterUserValidator(UnitOfWork unitOfWork/*, Guid currentUserId*/)
        {
            UnitOfWork = unitOfWork;
            //CurrentUserId = currentUserId;

            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Required field!")
                //.MustAsync((model, _, _) => EmailNotAlreadyExist(model.Email)).When(model => model.Email != null)
                .WithMessage("This address is already used!")
                .EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible)
                .MaximumLength(100)
                .WithMessage("The maximum length is 100 characters.");

            RuleFor(r => r.Username)
               .NotEmpty().WithMessage("Required field!")
               //.MustAsync((model, _, _) => UsernameNotAlreadyExist(model.Username)).When(model => model.Username != null)
               .WithMessage("There is already an account with this name!")
               .MaximumLength(50)
               .WithMessage("The maximum length is 50 characters.");

            RuleFor(r => r.Password)
                .NotEmpty().WithMessage("Required field!")
                .Length(6, 15)
                .Must(HasValidPassword)
                .WithMessage("Doesn't respect the condition!");

            RuleFor(x => x.ConfirmedPassword)
                .Equal(x => x.Password)
                .WithMessage("Passwords must match");

        }
        //public async Task<bool> EmailNotAlreadyExist(string email)
        //{
        //    //var user = await UnitOfWork.Users.Get().FirstOrDefaultAsync(u => u.Email == email && !u.IsDeleted);

        //    //return user == null ? true : false;
        //}
        //public async Task<bool> UsernameNotAlreadyExist(string username)
        //{
        //    //var user = await UnitOfWork.Users.Get().FirstOrDefaultAsync(u => u.Username == username && u.IsDeleted == false);

        //    //return user == null ? true : false;
        //}
    }
}
