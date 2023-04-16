using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learning.Migrations
{
    public partial class ResultMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResultId",
                table: "Register",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResultId",
                table: "QAMarks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResultId",
                table: "MCQmarks",
                type: "int",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Register_ResultId",
                table: "Register",
                column: "ResultId");

            migrationBuilder.CreateIndex(
                name: "IX_QAMarks_ResultId",
                table: "QAMarks",
                column: "ResultId");

            migrationBuilder.CreateIndex(
                name: "IX_MCQmarks_ResultId",
                table: "MCQmarks",
                column: "ResultId");

            migrationBuilder.AddForeignKey(
                name: "FK_MCQmarks_Result_ResultId",
                table: "MCQmarks",
                column: "ResultId",
                principalTable: "Result",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QAMarks_Result_ResultId",
                table: "QAMarks",
                column: "ResultId",
                principalTable: "Result",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Register_Result_ResultId",
                table: "Register",
                column: "ResultId",
                principalTable: "Result",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MCQmarks_Result_ResultId",
                table: "MCQmarks");

            migrationBuilder.DropForeignKey(
                name: "FK_QAMarks_Result_ResultId",
                table: "QAMarks");

            migrationBuilder.DropForeignKey(
                name: "FK_Register_Result_ResultId",
                table: "Register");

            migrationBuilder.DropTable(
                name: "Result");

            migrationBuilder.DropIndex(
                name: "IX_Register_ResultId",
                table: "Register");

            migrationBuilder.DropIndex(
                name: "IX_QAMarks_ResultId",
                table: "QAMarks");

            migrationBuilder.DropIndex(
                name: "IX_MCQmarks_ResultId",
                table: "MCQmarks");

            migrationBuilder.DropColumn(
                name: "ResultId",
                table: "Register");

            migrationBuilder.DropColumn(
                name: "ResultId",
                table: "QAMarks");

            migrationBuilder.DropColumn(
                name: "ResultId",
                table: "MCQmarks");
        }
    }
}
