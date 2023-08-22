using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learning.Migrations
{
    public partial class initalMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MCQs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    course = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptionA = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptionB = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptionC = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OptionD = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CorrectAnswer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    marks = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MCQs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuestionAnswer",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    course = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Keyword1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Keyword2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Keyword3 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Keyword4 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Keyword5 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    marks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionAnswer", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Result",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Result", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Register",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResultId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Register", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Register_Result_ResultId",
                        column: x => x.ResultId,
                        principalTable: "Result",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MCQmarks",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RegisterID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MCQMarks = table.Column<int>(type: "int", nullable: false),
                    TotalMarks = table.Column<int>(type: "int", nullable: false),
                    course = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResultId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MCQmarks", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MCQmarks_Register_RegisterID",
                        column: x => x.RegisterID,
                        principalTable: "Register",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MCQmarks_Result_ResultId",
                        column: x => x.ResultId,
                        principalTable: "Result",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "QAMarks",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RegisterID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QMarks = table.Column<float>(type: "real", nullable: false),
                    TotalMarks = table.Column<int>(type: "int", nullable: false),
                    course = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResultId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QAMarks", x => x.ID);
                    table.ForeignKey(
                        name: "FK_QAMarks_Register_RegisterID",
                        column: x => x.RegisterID,
                        principalTable: "Register",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QAMarks_Result_ResultId",
                        column: x => x.ResultId,
                        principalTable: "Result",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_MCQmarks_RegisterID",
                table: "MCQmarks",
                column: "RegisterID");

            migrationBuilder.CreateIndex(
                name: "IX_MCQmarks_ResultId",
                table: "MCQmarks",
                column: "ResultId");

            migrationBuilder.CreateIndex(
                name: "IX_QAMarks_RegisterID",
                table: "QAMarks",
                column: "RegisterID");

            migrationBuilder.CreateIndex(
                name: "IX_QAMarks_ResultId",
                table: "QAMarks",
                column: "ResultId");

            migrationBuilder.CreateIndex(
                name: "IX_Register_ResultId",
                table: "Register",
                column: "ResultId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MCQmarks");

            migrationBuilder.DropTable(
                name: "MCQs");

            migrationBuilder.DropTable(
                name: "QAMarks");

            migrationBuilder.DropTable(
                name: "QuestionAnswer");

            migrationBuilder.DropTable(
                name: "Register");

            migrationBuilder.DropTable(
                name: "Result");
        }
    }
}
