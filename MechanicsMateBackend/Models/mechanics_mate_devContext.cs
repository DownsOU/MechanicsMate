using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MechanicsMateBackend.Models
{
    public partial class MechanicsMateEntities : DbContext
    {
        public MechanicsMateEntities()
        {
        }

        public MechanicsMateEntities(DbContextOptions<MechanicsMateEntities> options)
            : base(options)
        {
        }

        public virtual DbSet<Mg1nYearMakeModelMasterAdvanced> Mg1nYearMakeModelMasterAdvanceds { get; set; }
        public virtual DbSet<ServiceLog> ServiceLogs { get; set; }
        public virtual DbSet<ServiceType> ServiceTypes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Vehicle> Vehicles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=mechanics-mate.cc6ruxrhlzww.us-east-2.rds.amazonaws.com;database=mechanics_mate_dev;user=admin;password=mechanic123", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.28-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Mg1nYearMakeModelMasterAdvanced>(entity =>
            {
                entity.HasKey(e => e.YmmId)
                    .HasName("PRIMARY");

                entity.ToTable("mg1n_year_make_model_master_advanced");

                entity.HasComment("Year Make Model Master Table")
                    .HasCharSet("utf8")
                    .UseCollation("utf8_general_ci");

                entity.Property(e => e.YmmId)
                    .HasColumnName("ymm_id")
                    .HasComment("YMM ID");

                entity.Property(e => e.Body)
                    .HasMaxLength(50)
                    .HasComment("Body");

                entity.Property(e => e.Engine)
                    .HasMaxLength(255)
                    .HasComment("Engine");

                entity.Property(e => e.EngineLiterDisplay)
                    .HasMaxLength(25)
                    .HasColumnName("Engine-Liter-Display")
                    .HasComment("Engine_Liter_Display");

                entity.Property(e => e.Make)
                    .HasMaxLength(255)
                    .HasColumnName("make")
                    .HasComment("Make");

                entity.Property(e => e.Model)
                    .HasMaxLength(255)
                    .HasColumnName("model")
                    .HasComment("Model");

                entity.Property(e => e.Submodel)
                    .HasMaxLength(100)
                    .HasComment("Submodel");

                entity.Property(e => e.Trim)
                    .HasMaxLength(100)
                    .HasComment("Trim");

                entity.Property(e => e.VehicleDisplayName)
                    .HasMaxLength(100)
                    .HasColumnName("Vehicle-Display-Name")
                    .HasComment("Vehicle_Display_Name");

                entity.Property(e => e.Year)
                    .HasMaxLength(255)
                    .HasColumnName("year")
                    .HasComment("Year");
            });

            modelBuilder.Entity<ServiceLog>(entity =>
            {
                entity.ToTable("ServiceLog");

                entity.HasIndex(e => e.ServiceTypeId, "ServiceTypeId");

                entity.HasIndex(e => e.ServicerId, "ServicerId");

                entity.HasIndex(e => e.VehicleId, "VehicleId");

                entity.Property(e => e.CustomServiceName).HasMaxLength(1000);

                entity.Property(e => e.InvoicePath).HasMaxLength(100);

                entity.Property(e => e.ServiceDate).HasColumnType("datetime");

                entity.Property(e => e.ServiceNotes).HasColumnType("mediumtext");

                entity.HasOne(d => d.ServiceType)
                    .WithMany(p => p.ServiceLogs)
                    .HasForeignKey(d => d.ServiceTypeId)
                    .HasConstraintName("ServiceLog_ibfk_2");

                entity.HasOne(d => d.Servicer)
                    .WithMany(p => p.ServiceLogs)
                    .HasForeignKey(d => d.ServicerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ServiceLog_ibfk_1");

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.ServiceLogs)
                    .HasForeignKey(d => d.VehicleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ServiceLog_ibfk_3");
            });

            modelBuilder.Entity<ServiceType>(entity =>
            {
                entity.ToTable("ServiceType");

                entity.Property(e => e.ServiceName)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.PasswordHash).HasMaxLength(500);

                entity.Property(e => e.UserType).HasMaxLength(1);
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.ToTable("Vehicle");

                entity.HasIndex(e => e.OwnerId, "OwnerId");

                entity.HasIndex(e => e.VehicleInfoId, "VehicleInfoId");

                entity.HasOne(d => d.Owner)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(d => d.OwnerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Vehicle_ibfk_1");

                entity.HasOne(d => d.VehicleInfo)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(d => d.VehicleInfoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Vehicle_ibfk_2");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
