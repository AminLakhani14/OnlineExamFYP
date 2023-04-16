﻿// <auto-generated />
using System;
using Learning.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Learning.Migrations
{
    [DbContext(typeof(QuestionAPIDbcontext))]
    partial class QuestionAPIDbcontextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Learning.Models.MCQmarks", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<int>("MCQMarks")
                        .HasColumnType("int");

                    b.Property<int?>("ResultId")
                        .HasColumnType("int");

                    b.Property<int>("TotalMarks")
                        .HasColumnType("int");

                    b.Property<string>("course")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("ResultId");

                    b.ToTable("MCQmarks");
                });

            modelBuilder.Entity("Learning.Models.MCQs", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CorrectAnswer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OptionA")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OptionB")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OptionC")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OptionD")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("course")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("marks")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("MCQs");
                });

            modelBuilder.Entity("Learning.Models.QAMarks", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<int>("QMarks")
                        .HasColumnType("int");

                    b.Property<int?>("ResultId")
                        .HasColumnType("int");

                    b.Property<int>("TotalMarks")
                        .HasColumnType("int");

                    b.Property<string>("course")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("ResultId");

                    b.ToTable("QAMarks");
                });

            modelBuilder.Entity("Learning.Models.QuestionAnswer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Keyword1")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Keyword2")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Keyword3")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Keyword4")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Keyword5")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("course")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("marks")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("QuestionAnswer");
                });

            modelBuilder.Entity("Learning.Models.Register", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("Age")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ResultId")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("ResultId");

                    b.ToTable("Register");
                });

            modelBuilder.Entity("Learning.Models.Result", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.HasKey("Id");

                    b.ToTable("Result");
                });

            modelBuilder.Entity("Learning.Models.MCQmarks", b =>
                {
                    b.HasOne("Learning.Models.Result", null)
                        .WithMany("MCQmarks")
                        .HasForeignKey("ResultId");
                });

            modelBuilder.Entity("Learning.Models.QAMarks", b =>
                {
                    b.HasOne("Learning.Models.Result", null)
                        .WithMany("QAMarks")
                        .HasForeignKey("ResultId");
                });

            modelBuilder.Entity("Learning.Models.Register", b =>
                {
                    b.HasOne("Learning.Models.Result", null)
                        .WithMany("Register")
                        .HasForeignKey("ResultId");
                });

            modelBuilder.Entity("Learning.Models.Result", b =>
                {
                    b.Navigation("MCQmarks");

                    b.Navigation("QAMarks");

                    b.Navigation("Register");
                });
#pragma warning restore 612, 618
        }
    }
}
