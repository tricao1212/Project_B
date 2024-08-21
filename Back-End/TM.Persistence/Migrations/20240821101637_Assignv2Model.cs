using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TM.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Assignv2Model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsConfirm",
                table: "Assignments",
                newName: "IsRequest");

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishedAt",
                table: "Assignments",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinishedAt",
                table: "Assignments");

            migrationBuilder.RenameColumn(
                name: "IsRequest",
                table: "Assignments",
                newName: "IsConfirm");
        }
    }
}
