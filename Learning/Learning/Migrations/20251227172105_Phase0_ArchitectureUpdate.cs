using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learning.Migrations
{
    public partial class Phase0_ArchitectureUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SchoolId",
                table: "Register",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Schools",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schools", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Register_SchoolId",
                table: "Register",
                column: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_Register_Schools_SchoolId",
                table: "Register",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Register_Schools_SchoolId",
                table: "Register");

            migrationBuilder.DropTable(
                name: "Schools");

            migrationBuilder.DropIndex(
                name: "IX_Register_SchoolId",
                table: "Register");

            migrationBuilder.DropColumn(
                name: "SchoolId",
                table: "Register");
        }
    }
}
