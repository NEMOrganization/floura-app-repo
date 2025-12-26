using Floura.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Floura.Tests.Models
{
    public class UserTests
    {
        private List<ValidationResult> Validate(User user)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(user);
            Validator.TryValidateObject(user, context, results, true);
            return results;
        }

        [Fact]
        public void User_IsValid_WhenAllFieldsAreCorrect()
        {
            // Arrange
            var user = new User
            {
                Email = "test@test.com",
                PasswordHash = "test1234",
                Language = Core.Models.Enums.Language.Danish
            };

            // Act
            var results = Validate(user);

            // Assert
            Assert.Empty(results);
        }

        [Fact]
        public void User_IsInvalid_WhenEmailIsEmpty()
        {
            // Arrange
            var user = new User
            {
                Email = "",
                PasswordHash = "test1234",
                Language = Core.Models.Enums.Language.Danish
            };

            // Act
            var results = Validate(user);

            // Assert
            Assert.Contains(results, r =>
                r.MemberNames.Contains(nameof(User.Email)));
        }


        [Fact]
        public void User_IsInvalid_WhenEmailIsNull()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new User
            {
                Id = userId,
                Email = null!,
                PasswordHash = "test1234",
                Language = Core.Models.Enums.Language.Danish
            };

            // Act
            var results = Validate(user);

            // Assert
            Assert.Contains(results, emailNull => emailNull.MemberNames.Contains(nameof(User.Email)));

        }

        [Fact]
        public void User_IsInvalid_WhenPasswordIsEmpty()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new User
            {
                Id = userId,
                Email = "test@test.com",
                PasswordHash = "",
                Language = Core.Models.Enums.Language.Danish
            };

            // Act
            var results = Validate(user);

            // Assert
            Assert.Contains(results, passwordIsEmpty => passwordIsEmpty.MemberNames.Contains(nameof(User.PasswordHash)));
        }


        [Fact]
        public void User_IsInvalid_WhenPasswordIsTooShort()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new User
            {
                Id = userId,
                Email = "test@test.com",
                PasswordHash = "t",
                Language = Core.Models.Enums.Language.Danish
            };

            // Act
            var results = Validate(user);

            // Assert
            Assert.Contains(results, passwordIsTooShort => passwordIsTooShort.MemberNames.Contains(nameof(User.PasswordHash)));
        }

        [Fact]
        public void User_Children_IsNeverNull()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new User
            {
                Id = userId,
                Email = "test@test.com",
                PasswordHash = "test1234",
                Language = Core.Models.Enums.Language.Danish
            };


            // Act & Assert
            Assert.NotNull(user.Children);
            Assert.Empty(user.Children);
        }
    }
}
