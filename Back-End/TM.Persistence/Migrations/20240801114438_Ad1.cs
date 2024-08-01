using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TM.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Ad1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkContents_Assignments_AssignmentId",
                table: "WorkContents");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "TypeTrees",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_TypeTrees_Name",
                table: "TypeTrees",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkContents_Assignments_AssignmentId",
                table: "WorkContents",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkContents_Assignments_AssignmentId",
                table: "WorkContents");

            migrationBuilder.DropIndex(
                name: "IX_TypeTrees_Name",
                table: "TypeTrees");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "TypeTrees",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkContents_Assignments_AssignmentId",
                table: "WorkContents",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
