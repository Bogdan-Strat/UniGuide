using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Domain.Entities;

namespace DataAccess.Context
{
    public partial class UniGuideContext : DbContext
    {
        public UniGuideContext()
        {
        }

        public UniGuideContext(DbContextOptions<UniGuideContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Chat> Chats { get; set; } = null!;
        public virtual DbSet<Domain.Entities.Domain> Domains { get; set; } = null!;
        public virtual DbSet<Student> Students { get; set; } = null!;
        public virtual DbSet<University> Universities { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local);Initial Catalog=UniGuide;Integrated Security=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chat>(entity =>
            {
                entity.ToTable("Chat");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ThreadId).HasMaxLength(100);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Chats)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatUser");
            });

            modelBuilder.Entity<Domain.Entities.Domain>(entity =>
            {
                entity.ToTable("Domain");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Domain1)
                    .HasMaxLength(50)
                    .HasColumnName("Domain");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.ToTable("Student");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.PhoneNumber).HasMaxLength(20);

                entity.HasOne(d => d.Domain)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.DomainId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentDomain");

                entity.HasOne(d => d.University)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.UniversityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentUniversity");
            });

            modelBuilder.Entity<University>(entity =>
            {
                entity.ToTable("University");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AvgGrade).HasColumnType("decimal(3, 1)");

                entity.Property(e => e.MonthBudgetEu).HasColumnName("MonthBudgetEU");

                entity.Property(e => e.MonthBudgetNonEu).HasColumnName("MonthBudgetNonEU");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Location).HasMaxLength(100);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AvgGrade).HasColumnType("decimal(3, 2)");

                entity.Property(e => e.Balance).HasColumnType("decimal(3, 1)");

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.HashedPassword).HasMaxLength(256);

                entity.Property(e => e.HomeUniversity).HasMaxLength(20);

                entity.Property(e => e.IsEu).HasColumnName("IsEU");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.PhoneNumber).HasMaxLength(20);

                //entity.HasMany(d => d.Chats)
                //    .WithMany(p => p.Users)
                //    .UsingEntity<Dictionary<string, object>>(
                //        "UserXchat",
                //        l => l.HasOne<Chat>().WithMany().HasForeignKey("ChatId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_UserXChatChat"),
                //        r => r.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_UserXChatUser"),
                //        j =>
                //        {
                //            j.HasKey("UserId", "ChatId");

                //            j.ToTable("UserXChat");
                //        });

                entity.HasMany(d => d.Universities)
                    .WithMany(p => p.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "UserXuniversity",
                        l => l.HasOne<University>().WithMany().HasForeignKey("UniversityId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_University"),
                        r => r.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_User"),
                        j =>
                        {
                            j.HasKey("UserId", "UniversityId");

                            j.ToTable("UserXUniversity");
                        });
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
