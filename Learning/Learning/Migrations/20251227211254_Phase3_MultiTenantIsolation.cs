using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learning.Migrations
{
    /// <inheritdoc />
    public partial class Phase3_MultiTenantIsolation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SchoolId",
                table: "Result",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SchoolId",
                table: "QuestionAnswer",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SchoolId",
                table: "MCQs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Result_SchoolId",
                table: "Result",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionAnswer_SchoolId",
                table: "QuestionAnswer",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_MCQs_SchoolId",
                table: "MCQs",
                column: "SchoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_MCQs_Schools_SchoolId",
                table: "MCQs",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionAnswer_Schools_SchoolId",
                table: "QuestionAnswer",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Result_Schools_SchoolId",
                table: "Result",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MCQs_Schools_SchoolId",
                table: "MCQs");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionAnswer_Schools_SchoolId",
                table: "QuestionAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_Result_Schools_SchoolId",
                table: "Result");

            migrationBuilder.DropIndex(
                name: "IX_Result_SchoolId",
                table: "Result");

            migrationBuilder.DropIndex(
                name: "IX_QuestionAnswer_SchoolId",
                table: "QuestionAnswer");

            migrationBuilder.DropIndex(
                name: "IX_MCQs_SchoolId",
                table: "MCQs");

            migrationBuilder.DropColumn(
                name: "SchoolId",
                table: "Result");

            migrationBuilder.DropColumn(
                name: "SchoolId",
                table: "QuestionAnswer");

            migrationBuilder.DropColumn(
                name: "SchoolId",
                table: "MCQs");
        }
    }
}
